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

  window.solveEC2601Part1 = function solveEC2601Part1(input) {
    return parsePineConeCounts(input)
      .reduce((total, count) => {
        const sideLength = ceilSquareRoot(count);
        return total + sideLength * sideLength - count;
      }, 0n)
      .toString();
  };
})();