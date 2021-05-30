import { YOUTUBE_URL_REGEX } from '@/constants/patterns';

// eslint-disable-next-line import/prefer-default-export
export const validateYouTubeUrl = (url: string): boolean => {
    if (url.match(YOUTUBE_URL_REGEX)) {
        return true;
    }
    return false;
};
