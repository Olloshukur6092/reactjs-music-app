export const formatDuration = (ms: number) => {
    try {
      const date = new Date(0);
      date.setMilliseconds(ms);
      const time = date.toISOString().slice(11, 19);
      const result = time.startsWith("00:0")
        ? time.slice(4)
        : time.startsWith("00")
        ? time.slice(3)
        : time.length === 8 && time.startsWith("0")
        ? time.slice(1)
        : time;
      return result;
    } catch (error) {
      return "0:00";
    }
  };
  
  export const formatNumber = (num: number) => {
    return Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(num);
  };
  