import { createWriteStream, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { deflateSync } from "node:zlib";

function clamp(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function mix(a, b, t) {
  return a + (b - a) * t;
}

function hash(x, y) {
  let n = x * 374761393 + y * 668265263;
  n = (n ^ (n >> 13)) * 1274126177;
  return ((n ^ (n >> 16)) >>> 0) / 4294967295;
}

function crc32(buf) {
  let c = ~0;
  for (let i = 0; i < buf.length; i += 1) {
    c ^= buf[i];
    for (let k = 0; k < 8; k += 1) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const typeBuf = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

function writePng({ width, height, output, pixel }) {
  const raw = Buffer.alloc((width * 4 + 1) * height);
  let offset = 0;

  for (let y = 0; y < height; y += 1) {
    raw[offset] = 0;
    offset += 1;
    for (let x = 0; x < width; x += 1) {
      const rgba = pixel(x, y, width, height);
      raw[offset] = rgba[0];
      raw[offset + 1] = rgba[1];
      raw[offset + 2] = rgba[2];
      raw[offset + 3] = rgba[3];
      offset += 4;
    }
  }

  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  mkdirSync(dirname(output), { recursive: true });
  const png = Buffer.concat([signature, chunk("IHDR", ihdr), chunk("IDAT", deflateSync(raw, { level: 9 })), chunk("IEND", Buffer.alloc(0))]);
  createWriteStream(output).end(png);
}

function skyPixel(x, y, width, height) {
  const u = x / (width - 1);
  const v = y / (height - 1);
  const top = [244, 251, 255];
  const mid = [220, 233, 236];
  const low = [247, 239, 218];
  const horizon = v < 0.55 ? v / 0.55 : (v - 0.55) / 0.45;
  const base = v < 0.55 ? top.map((c, i) => mix(c, mid[i], horizon)) : mid.map((c, i) => mix(c, low[i], horizon));
  const sun = Math.max(0, 1 - Math.hypot((u - 0.74) * 1.22, (v - 0.24) * 1.9) / 0.42);
  const cloud = Math.max(0, Math.sin((u * 9.8 + v * 2.4) * Math.PI) * 0.5 + 0.5) * Math.max(0, 1 - Math.abs(v - 0.42) * 3.4);
  const wire = Math.abs(v - (0.16 + u * 0.22)) < 0.0026 || Math.abs(v - (0.23 + u * 0.16)) < 0.0019 ? -58 : 0;
  const scan = y % 5 === 0 ? -5 : 0;
  const noise = (hash(x, y) - 0.5) * 14;
  const redGlitch = x > width * 0.085 && x < width * 0.089 && y > height * 0.18 && y < height * 0.72 ? 45 : 0;

  return [
    clamp(base[0] + sun * 42 + cloud * 12 + wire + scan + noise + redGlitch),
    clamp(base[1] + sun * 30 + cloud * 10 + wire + scan + noise - redGlitch * 0.36),
    clamp(base[2] + sun * 6 + cloud * 16 + wire + scan + noise - redGlitch * 0.44),
    255
  ];
}

function rooftopPixel(x, y, width, height) {
  const u = x / width;
  const v = y / height;
  const base = skyPixel(x, y, width, height);
  const haze = Math.max(0, 1 - Math.abs(v - 0.42) * 2.4);
  let r = base[0] + haze * 10;
  let g = base[1] + haze * 8;
  let b = base[2] + haze * 6;

  if (v > 0.64) {
    const t = (v - 0.64) / 0.36;
    r = mix(r, 45, t * 0.72);
    g = mix(g, 55, t * 0.72);
    b = mix(b, 58, t * 0.72);
  }

  const railY = 0.67 + Math.sin(u * Math.PI * 2.1) * 0.012;
  if (Math.abs(v - railY) < 0.006 || (v > 0.67 && v < 0.84 && Math.abs((u * 18) % 1 - 0.03) < 0.018)) {
    r -= 92;
    g -= 95;
    b -= 93;
  }

  const door = u > 0.08 && u < 0.24 && v > 0.43 && v < 0.69;
  if (door) {
    r = mix(r, 186, 0.55);
    g = mix(g, 202, 0.55);
    b = mix(b, 203, 0.55);
  }

  if (Math.abs(v - (0.18 + u * 0.19)) < 0.002 || Math.abs(v - (0.28 - u * 0.08)) < 0.002) {
    r -= 68;
    g -= 68;
    b -= 64;
  }

  const tape = y % 6 === 0 ? -8 : 0;
  const grain = (hash(x, y) - 0.5) * 20;
  return [clamp(r + tape + grain), clamp(g + tape + grain), clamp(b + tape + grain), 255];
}

function mirrorPixel(x, y, width, height) {
  const u = x / width;
  const v = y / height;
  const vertical = v < 0.52 ? v / 0.52 : (v - 0.52) / 0.48;
  const ceiling = [238, 243, 240];
  const floor = [201, 218, 216];
  const shadow = [39, 43, 48];
  let r = v < 0.52 ? mix(ceiling[0], floor[0], vertical) : mix(floor[0], shadow[0], vertical * 0.65);
  let g = v < 0.52 ? mix(ceiling[1], floor[1], vertical) : mix(floor[1], shadow[1], vertical * 0.65);
  let b = v < 0.52 ? mix(ceiling[2], floor[2], vertical) : mix(floor[2], shadow[2], vertical * 0.65);

  const mirror = u > 0.57 && u < 0.9 && v > 0.16 && v < 0.76;
  if (mirror) {
    const shine = Math.max(0, 1 - Math.hypot((u - 0.74) * 1.6, (v - 0.32) * 2.2));
    r = mix(r, 214 + shine * 30, 0.62);
    g = mix(g, 231 + shine * 18, 0.62);
    b = mix(b, 232 + shine * 16, 0.62);
  }

  if (Math.abs(u - 0.57) < 0.006 || Math.abs(u - 0.9) < 0.006 || Math.abs(v - 0.16) < 0.006 || Math.abs(v - 0.76) < 0.006) {
    r -= 88;
    g -= 80;
    b -= 76;
  }

  const redLine = u > 0.18 && u < 0.185 && v > 0.2 && v < 0.86;
  if (redLine) {
    r = 176;
    g = 52;
    b = 55;
  }

  const floorLine = Math.abs(v - (0.63 + Math.sin(u * 12) * 0.012)) < 0.003;
  if (floorLine) {
    r -= 34;
    g -= 36;
    b -= 34;
  }

  const grain = (hash(x, y) - 0.5) * 12;
  return [clamp(r + grain), clamp(g + grain), clamp(b + grain), 255];
}

function archivePixel(x, y, width, height) {
  const u = x / width;
  const v = y / height;
  const warm = [239, 232, 208];
  const green = [176, 207, 197];
  const ink = [24, 25, 25];
  let r = mix(warm[0], green[0], u * 0.55 + v * 0.28);
  let g = mix(warm[1], green[1], u * 0.55 + v * 0.28);
  let b = mix(warm[2], green[2], u * 0.55 + v * 0.28);

  if (v > 0.61) {
    r = mix(r, 63, 0.36);
    g = mix(g, 72, 0.36);
    b = mix(b, 71, 0.36);
  }

  const monitor = u > 0.1 && u < 0.47 && v > 0.22 && v < 0.58;
  if (monitor) {
    const glow = Math.max(0, 1 - Math.hypot((u - 0.29) * 2.4, (v - 0.39) * 3.4));
    r = mix(ink[0], 202 + glow * 34, 0.48);
    g = mix(ink[1], 230 + glow * 18, 0.48);
    b = mix(ink[2], 230 + glow * 18, 0.48);
  }

  if ((u > 0.1 && u < 0.47 && Math.abs(v - 0.22) < 0.008) || (v > 0.22 && v < 0.58 && (Math.abs(u - 0.1) < 0.006 || Math.abs(u - 0.47) < 0.006))) {
    r = 35;
    g = 37;
    b = 38;
  }

  const paper = u > 0.58 && u < 0.84 && v > 0.28 && v < 0.73;
  if (paper) {
    r = mix(r, 246, 0.7);
    g = mix(g, 239, 0.7);
    b = mix(b, 214, 0.7);
  }

  if (paper && Math.abs((v * 24) % 1 - 0.5) < 0.016 && u > 0.62 && u < 0.8) {
    r -= 55;
    g -= 52;
    b -= 45;
  }

  const redMark = u > 0.83 && u < 0.9 && v > 0.2 && v < 0.31;
  if (redMark) {
    r = 177;
    g = 59;
    b = 54;
  }

  const grain = (hash(x, y) - 0.5) * 18;
  const scan = y % 4 === 0 ? -5 : 0;
  return [clamp(r + grain + scan), clamp(g + grain + scan), clamp(b + grain + scan), 255];
}

const publicDir = join(process.cwd(), "public");

writePng({
  width: 1920,
  height: 1080,
  output: join(publicDir, "anniversary-hero.png"),
  pixel: skyPixel
});

writePng({
  width: 1280,
  height: 720,
  output: join(publicDir, "cg-rooftop.png"),
  pixel: rooftopPixel
});

writePng({
  width: 1280,
  height: 720,
  output: join(publicDir, "cg-mirror.png"),
  pixel: mirrorPixel
});

writePng({
  width: 1280,
  height: 720,
  output: join(publicDir, "cg-archive.png"),
  pixel: archivePixel
});
