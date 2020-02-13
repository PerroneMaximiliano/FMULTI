export interface AudioFile {
    user: string;
    number: number;
    name: string;
    duration: string;
    file: string;
}

export interface RespAudios {
    ok: boolean;
    audios: Array<AudioFile>;
}