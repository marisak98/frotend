export function useAnalytics() {
  return {
    track: (eventName: string, data: any) => {
      // send event to analytics
    },
  };
}
