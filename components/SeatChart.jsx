/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-plusplus */
import roundTo from 'lodash/round';
import React from 'react';
import sl from 'sainte-lague';

const pi = Math.PI;

const round = (x) => roundTo(x, 10);
const seatSum = (o) => {
  let result = 0;
  for (const key in o) result += o[key].seats;
  return result;
};
const merge = (arrays) => {
  let result = [];
  for (const list of arrays) result = result.concat(list);
  return result;
};

const coords = (r, b) => ({
  x: round(r * Math.cos(b / r - pi)),
  y: round(r * Math.sin(b / r - pi)),
});

const calculateSeatDistance = (seatCount, numberOfRings, r) => {
  const x = (pi * numberOfRings * r) / (seatCount - numberOfRings);
  const y =
    1 +
    (pi * (numberOfRings - 1) * numberOfRings) /
      2 /
      (seatCount - numberOfRings);

  const a = x / y;
  return a;
};

const score = (m, n, r) =>
  Math.abs((calculateSeatDistance(m, n, r) * n) / r - 5 / 7);

const calculateNumberOfRings = (seatCount, r) => {
  let n = Math.floor(Math.log(seatCount) / Math.log(2)) || 1;
  let distance = score(seatCount, n, r);

  let direction = 0;
  if (score(seatCount, n + 1, r) < distance) direction = 1;
  if (score(seatCount, n - 1, r) < distance && n > 1) direction = -1;

  while (score(seatCount, n + direction, r) < distance && n > 0) {
    distance = score(seatCount, n + direction, r);
    n += direction;
  }
  return n;
};

const nextRing = (rings, ringProgress) => {
  let progressQuota;
  let tQuota;
  for (const index in rings) {
    tQuota = round((ringProgress[index] || 0) / rings[index].length);
    if (!progressQuota || tQuota < progressQuota) progressQuota = tQuota;
  }
  for (const index in rings) {
    tQuota = round((ringProgress[index] || 0) / rings[index].length);
    if (tQuota === progressQuota) return index;
  }
};

const generatePoints = (parliament, r0) => {
  const seatCount = seatSum(parliament);
  const numberOfRings = calculateNumberOfRings(seatCount, r0);
  const seatDistance = calculateSeatDistance(seatCount, numberOfRings, r0);

  // calculate ring radii
  let rings = [];
  for (let i = 1; i <= numberOfRings; i++) {
    rings[i] = r0 - (i - 1) * seatDistance;
  }

  // calculate seats per ring
  // todo: float to int
  rings = sl(rings, seatCount);

  const points = [];
  let r;
  let a;
  let point;

  // build seats
  // loop rings
  let ring;
  for (let i = 1; i <= numberOfRings; i++) {
    ring = [];
    // calculate ring-specific radius
    r = r0 - (i - 1) * seatDistance;
    // calculate ring-specific distance
    a = (pi * r) / (rings[i] - 1 || 1);

    // loop points
    for (let j = 0; j <= rings[i] - 1; j++) {
      point = coords(r, j * a);
      point.r = 0.4 * seatDistance;
      ring.push(point);
    }
    points.push(ring);
  }

  // fill seats
  const ringProgress = Array(points.length).fill(0);
  for (const party in parliament) {
    for (let i = 0; i < parliament[party].seats; i++) {
      ring = nextRing(points, ringProgress);
      points[ring][ringProgress[ring]].fill = parliament[party].colour;
      points[ring][ringProgress[ring]].party = party;
      ringProgress[ring]++;
    }
  }

  return merge(points);
};

const pointToSVG = (hFn) => (point, index) =>
  hFn('circle', {
    key: `${point.x} ${index}`,
    cx: point.x,
    cy: point.y,
    r: point.r,
    fill: point.fill,
    className: point.party,
  });

const SeatChart = ({
  parliament,
  seatCount = false,
  hFunction = React.createElement,
}) => {
  const radius = 20;
  const points = generatePoints(parliament, radius);
  const a = points[0].r / 0.4;
  const elements = points.map((point, index) =>
    pointToSVG(hFunction)(point, index),
  );
  if (seatCount) {
    elements.push(
      hFunction(
        'text',
        {
          x: 0,
          y: 0,
          key: 'number',
          textAnchor: 'middle',
          style: {
            fontFamily: 'Helvetica',
            fontSize: `${0.25 * radius}px`,
            fill: 'var(--fg-color)',
          },
          className: 'seatNumber',
        },
        elements.length,
      ),
    );
  }

  return hFunction(
    'svg',
    {
      xmlns: 'http://www.w3.org/2000/svg',
      // height: '240px',
      // width: '240px',
      viewBox: `${-radius - a / 2},${-radius - a / 2},${2 * radius + a},${
        radius + a
      }`,
    },
    elements,
  );
};

export default SeatChart;
