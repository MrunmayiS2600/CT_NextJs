declare global {
  interface Window {
    clevertap: {
      event: {
        push: (eventName: string, eventProps?: Record<string, any>) => void;
      };
      profile: {
        push: (profileData: Record<string, any>) => void;
      };
      onUserLogin: {
        push: (profileData: { Site: Record<string, any> }) => void;
      };
      notifications: any[];
      privacy: {
        push: (config: { optOut?: boolean; useIP?: boolean }) => void;
      };
      account: {
        push: (config: { id: string }) => void;
      };
      region?: string;
      spa?: boolean;
    };
  }
}

export {};