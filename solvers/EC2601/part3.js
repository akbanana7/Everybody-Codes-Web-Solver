(() => {
  function parsePineConeCounts(input) {
    const trimmedInput = input.trim();
    if (!trimmedInput) {
      throw new Error("Enter one or more pine-cone counts.");
    }

    const counts = trimmedInput.split(/\s*,\s*|\s+/);
    if (counts.some((count) => !/^\d+$/.test(count))) {
      throw new Error("Use non-negative whole numbers separated by commas or whitespace.");
    }

    return counts.map(BigInt);
  }

  function ceilSquareRoot(value) {
    if (value <= 1n) return 1n;

    let root = value;
    let next = (root + 1n) / 2n;
    while (next < root) {
      root = next;
      next = (root + value / root) / 2n;
    }

    return root * root === value ? root : root + 1n;
  }

  window.solveEC2601Part3 = function solveEC2601Part3(input) {
    return parsePineConeCounts(input)
      .reduce((total, count) => {
        let sideLength = ceilSquareRoot(count + 1n);
        if (sideLength % 2n === 0n) sideLength += 1n;
        if (sideLength < 3n) sideLength = 3n;

        const formationCount = sideLength * sideLength - 1n;
        return total + formationCount - count;
      }, 0n)
      .toString();
  };
})();
