import { queryWithReauth } from '@/core/data/base.api';
import { createApi } from '@reduxjs/toolkit/dist/query/react';
import {
  IUser,
  IUserAwards,
  IUserAwardsUnion,
  IUserCreate,
} from '@/user/model/user.types';
import { getUserUrl } from '@/core/config/api.config';
import { IUserUpdateRequest } from '@/user/presenter/admin/edit/user-edit.type';
import { IUserAwardCount, IUserAwardsCountDep } from '../model/count.types';
import {
  IUserSaveSettingRequest,
  IUserSetting,
} from '@/user/model/user.setting';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: queryWithReauth,
  tagTypes: ['User', 'Count', 'Award', 'None', 'Setting'],
  endpoints: (build) => ({
    //Получить всех сотрудников по отделу
    getByDepartment: build.query<
      IUser[],
      { departmentId: string; filter: string }
    >({
      query: (body) => ({
        method: 'POST',
        url: getUserUrl('/get_department'),
        body: body,
      }),
      providesTags: ['User'],
    }),

    //Получить всех начальников, которые есть в распоряжении
    getBosses: build.query<
      IUser[],
      { companyId: string | undefined; filter: string }
    >({
      query: (body) => ({
        method: 'POST',
        url: getUserUrl('/get_bosses'),
        body: body,
      }),
      providesTags: ['User'],
    }),

    getById: build.query<IUser, string>({
      query: (userId) => ({
        method: 'POST',
        url: getUserUrl('/get_id'),
        body: { userId },
      }),
      providesTags: ['User'],
    }),

    getByIdDepName: build.query<IUser, string>({
      query: (userId) => ({
        method: 'POST',
        url: getUserUrl('/get_id_dep'),
        body: { userId },
      }),
      providesTags: ['User'],
    }),

    /**
     * Получение сотрудника с наградами и соответствующими записями о его награждении
     * @param: userId
     */
    getByIdWithAwards: build.query<IUserAwardsUnion, string>({
      query: (userId) => ({
        method: 'POST',
        url: getUserUrl('/get_id_awards'),
        body: { userId },
      }),
      providesTags: ['User'],
    }),

    getByCompany: build.query<IUser[], { companyId: string; filter?: string }>({
      query: (data) => ({
        method: 'POST',
        url: getUserUrl('/get_company'),
        body: data,
      }),
      providesTags: ['User'],
    }),

    /**
     * Получить сотрудников компании с именами отделов
     */
    getByCompanyDepName: build.query<
      IUser[],
      { companyId: string; filter?: string }
    >({
      query: (data) => ({
        method: 'POST',
        url: getUserUrl('/get_company_dep'),
        body: data,
      }),
      providesTags: ['User'],
    }),

    /**
     * Получить сотрудников компании с присвоенными наградами (облегченными)
     * Сортировка по
     *  -количеству наград по убыванию
     *  -фамилии по возрастанию
     */
    getByCompanyWithAwards: build.query<
      IUserAwards[],
      { companyId: string; filter?: string }
    >({
      query: (data) => ({
        method: 'POST',
        url: getUserUrl('/get_awards'),
        body: data,
      }),
      providesTags: ['User'],
    }),

    /**
     * Получить сотрудников компании с присвоенными наградами (полная информация)
     * Сортировка по
     *  -количеству наград по убыванию
     *  -фамилии по возрастанию
     */
    getByCompanyWithAwardsUnion: build.query<
      IUserAwardsUnion[],
      { companyId: string; filter?: string }
    >({
      query: (data) => ({
        method: 'POST',
        url: getUserUrl('/get_awards_full'),
        body: data,
      }),
      providesTags: ['User'],
    }),

    getBests: build.query<IUser[], { companyId: string; limit: number }>({
      query: (body) => ({
        method: 'POST',
        url: getUserUrl('/get_best'),
        body: body,
      }),
      providesTags: ['User'],
    }),

    create: build.mutation<IUser, IUserCreate>({
      query: (user) => ({
        method: 'POST',
        url: getUserUrl('/create'),
        body: user,
      }),
      invalidatesTags: ['User', 'Count'],
    }),

    delete: build.mutation<IUser, string>({
      query: (userId) => ({
        method: 'DELETE',
        url: getUserUrl(),
        body: { userId },
      }),
      invalidatesTags: ['User', 'Count'],
    }),

    update: build.mutation<void, IUserUpdateRequest>({
      query: (user) => ({
        method: 'PUT',
        url: getUserUrl('/update'),
        body: user,
      }),
      invalidatesTags: ['User'],
    }),

    /**
     * Обновление пароля сотрудника
     */
    updatePassword: build.mutation<
      void,
      { userId: string; password: string; newPassword: string }
    >({
      query: (body) => ({
        method: 'PUT',
        url: getUserUrl('/password'),
        body: body,
      }),
      invalidatesTags: ['None'],
    }),

    getCountByCompany: build.query<number, string>({
      query: (companyId) => ({
        method: 'POST',
        url: getUserUrl('/count_c'),
        body: { companyId },
      }),
      providesTags: ['Count'],
    }),

    getCountByDepartment: build.query<number, string>({
      query: (departmentId) => ({
        method: 'POST',
        url: getUserUrl('/count_d'),
        body: { departmentId },
      }),
      providesTags: ['Count'],
    }),

    /**
     * Получить количество наград в отделе
     * @param [departmentId]
     */
    getAwardCountByDepartment: build.query<IUserAwardCount, string>({
      query: (departmentId) => ({
        method: 'POST',
        url: getUserUrl('/count_ad'),
        body: { departmentId },
      }),
      providesTags: ['Count'],
    }),

    /**
     * Получить количество наград в компании
     * @param [companyId]
     */
    getAwardCountByCompany: build.query<IUserAwardCount, string>({
      query: (companyId) => ({
        method: 'POST',
        url: getUserUrl('/count_ac'),
        body: { companyId },
      }),
      providesTags: ['Count'],
    }),

    /**
     * Получить информацию о награжденных сотрудниках в компании,
     * с группировкой по отделам
     * @param [companyId]
     */
    getAwardCountByCompanyDepGroup: build.query<IUserAwardsCountDep[], string>({
      query: (companyId) => ({
        method: 'POST',
        url: getUserUrl('/count_ac_dep'),
        body: { companyId },
      }),
      providesTags: ['Count'],
    }),

    // Удалить в будущем
    updateImage: build.mutation<void, { userId: string; formData: FormData }>({
      query: (arg) => ({
        method: 'PUT',
        url: getUserUrl('/image/update'),
        params: { id: arg.userId },
        body: arg.formData,
      }),
      invalidatesTags: [{ type: 'User' }],
    }),

    /**
     * Удаление основного изображения
     * @param [userId]
     */
    deleteMainImage: build.mutation<void, string>({
      query: (userId) => ({
        method: 'DELETE',
        url: getUserUrl('/image/delete'),
        body: { userId },
      }),
      invalidatesTags: ['User'],
    }),

    /**
     * Обновленная версия работы со множеством изображений сущности
     */

    /**
     * Добавление изображения
     * @param: formData: imageUrl:file, userId, description
     */
    imageAdd: build.mutation<void, FormData>({
      query: (formData) => ({
        method: 'POST',
        url: getUserUrl('/image'),
        body: formData,
      }),
      invalidatesTags: [{ type: 'User' }],
    }),

    /**
     * Обновление изображения
     * @param: formData: imageUrl:file, userId, imageKey, description
     */
    imageUpdate: build.mutation<void, FormData>({
      query: (formData) => ({
        method: 'PUT',
        url: getUserUrl('/image'),
        body: formData,
      }),
      invalidatesTags: [{ type: 'User' }],
    }),

    /**
     * Удаление изображения
     * @param: userId, imageKey
     */
    imageDelete: build.mutation<void, { userId: string; imageKey: string }>({
      query: (body) => ({
        method: 'DELETE',
        url: getUserUrl('/image'),
        body: body,
      }),
      invalidatesTags: [{ type: 'User' }],
    }),

    /**
     * Сохранение настроек сотрудника
     */
    saveSetting: build.mutation<void, IUserSaveSettingRequest>({
      query: (body) => ({
        method: 'PUT',
        url: getUserUrl('/setting'),
        body: body,
      }),
      invalidatesTags: ['Setting'],
    }),

    /**
     * Получить настройки сотрудника
     * @param: [userId]
     */
    getSetting: build.query<IUserSetting, string>({
      query: (userId) => ({
        method: 'POST',
        url: getUserUrl('/setting'),
        body: { userId },
      }),
      providesTags: ['Setting'],
    }),
  }),
});
