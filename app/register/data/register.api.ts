import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {baseQuery} from "@/core/data/base.api";
import {IAuthResponse} from "@/auth/model/auth.types";
import {getRegisterUrl} from "@/core/config/api.config";
import {authActions} from "@/auth/data/auth.slice";
import {ILoginInput} from "@/auth/model/auth.interface";

export const registerApi = createApi({
    reducerPath: 'registerApi',
    baseQuery: baseQuery,
    tagTypes: ['Register'],

    endpoints: (build) => ({

        // Убрать из authApi
        registerStepOne: build.mutation<void, ILoginInput>({
            query: (body) => ({
                url: getRegisterUrl('/owner/temp'),
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Register'],
        }),

        // Убрать из authApi
        registerStepTwo: build.mutation<IAuthResponse, { code: string, email: string }>({
            query: (body) => ({
                url: getRegisterUrl('/owner/valid'),
                method: 'POST',
                body: body
            }),
            invalidatesTags: ['Register'],
            async onQueryStarted(args, {dispatch, queryFulfilled}) {
                try {
                    const {data} = await queryFulfilled;
                    await dispatch(authActions.setState(data));
                } catch (error) {
                    console.error(`REGISTER ERROR!`, error)
                }
            },
        }),


        /**
         * Сброс пароля сотрудника
         * Шаг 1: Отправка ссылки на указанную почту
         *
         * @param [email] почта сотрудника
         */
        passwordResetStepOne: build.mutation<void, string>({
            query: (email) => ({
                url: getRegisterUrl('/psw/restore'),
                method: 'POST',
                body: {email}
            }),
            invalidatesTags: ['Register'],
        }),

        /**
         * Сброс пароля сотрудника
         * Шаг 2: Получение отправка данных, полученных из ссылки и нового пароля
         *
         * @param  [userId] получаем из ссылки как параметр страницы
         * @param  [code] то же
         * @param  [password] новый пароль
         */
        passwordResetStepTwo: build.mutation<void, { userId: string, code: string, password: string }>({
            query: (email) => ({
                url: getRegisterUrl('/psw/reset'),
                method: 'POST',
                body: {email}
            }),
            invalidatesTags: ['Register'],
        }),

    })
})