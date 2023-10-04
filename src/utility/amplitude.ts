import { AMPLITUDE_API_KEY } from '@/secret';
import * as amplitude from '@amplitude/analytics-browser';

export const initAmplitude = () => {
    amplitude.init(AMPLITUDE_API_KEY, undefined, {
        defaultTracking: {
          pageViews: { trackHistoryChanges: 'all' },
        },
      });
    amplitude.logEvent('INIT_AMPLITUDE');
}

export const logEvent = (eventName: string | amplitude.Types.BaseEvent, eventProperties?: Record<string, any> | undefined) => {
    amplitude.track(eventName, eventProperties);
};

export const resetAmplitude = () => {
    amplitude.reset();
};
