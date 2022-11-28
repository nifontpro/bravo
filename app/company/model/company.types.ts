import { ImageRef } from '@/core/model/image.types';

export interface ICompany {
  id: string;
  name: string;
  description?: string;

  phone?: string;
  email?: string;
  address?: string;

  imageUrl?: string;
  imageKey?: string;
  images: ImageRef[];
}

export interface ICompanyCreate extends Omit<ICompany, 'id' | 'imageUrl' | 'imageKey' | 'images'> {
  file: FileList
}