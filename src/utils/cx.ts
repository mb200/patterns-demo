type Input = string | { [key: string]: boolean } | undefined | null;

function cx(...classes: Input[]): string {
  return classes
    .reduce<string[]>((memo, current) => {
      if (current) {
        if (typeof current === 'string') {
          memo.push(current);
        } else if (Object.keys(current).length) {
          const truthyClasses = Object.keys(current).map((k) => (!!current[k] ? k : undefined));
          memo = memo.concat(truthyClasses.filter(Boolean) as string[]);
        }
      }

      return memo;
    }, [])
    .join(' ');
}

export { cx };
