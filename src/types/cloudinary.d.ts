declare namespace Cloudinary {
  interface Resource {
    public_id: string;
    secure_url: string;
    original_filename: string;
  }

  interface ResourcesResult {
    resources: Resource[];
  }

  interface CloudinaryConfig {
    cloud_name: string;
    api_key: string;
    api_secret: string;
    secure: boolean;
  }
}

declare module 'cloudinary' {
  export function config(config: Cloudinary.CloudinaryConfig): void;
  export namespace api {
    export function resources(
      options: {
        type: 'upload';
        prefix: string;
        max_results?: number;
      },
      callback: (error: Error | null, result: Cloudinary.ResourcesResult) => void
    ): void;
  }
}
