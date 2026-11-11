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

  window.solveEC2601Part2 = function solveEC2601Part2(input) {
    return parsePineConeCounts(input)
      .reduce((total, count) => {
        let sideLength = (count + 7n) / 4n;
        if (sideLength < 3n) sideLength = 3n;

        const frameCount = sideLength * 4n - 4n;
        return total + frameCount - count;
      }, 0n)
      .toString();
  };
})();
