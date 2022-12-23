import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {queryWithReauth} from "@/core/data/base.api";
import {getMessageUrl} from "@/core/config/api.config";
import {IMessage} from "../model/message.types";
import {ISendMessageRequest} from "../model/message_api.types";

export const messageApi = createApi({
	reducerPath: 'messageApi',
	baseQuery: queryWithReauth,
	tagTypes: ['Message'],
	endpoints: (build) => ({

		/**
		 * Отправить сообщение сотруднику
		 */
		send: build.mutation<IMessage, ISendMessageRequest>({
			query: (request) => ({
				method: 'POST',
				url: getMessageUrl("/send"),
				body: request
			}),
			invalidatesTags: ['Message']
		}),

		/**
		 * Удалить сообщение
		 * @param [messageId]
		 */
		delete: build.mutation<IMessage, string>({
			query: (messageId) => ({
				method: 'DELETE',
				url: getMessageUrl(),
				body: {messageId}
			}),
			invalidatesTags: ['Message']
		}),

		/**
		 * Получить все сообщения сотрудника
		 * @param [userId]
		 */
		getByUser: build.query<IMessage, string>({
			query: (userId) => ({
				method: 'POST',
				url: getMessageUrl("/user"),
				body: {userId}
			}),
			providesTags: ['Message']
		}),

		/**
		 * Пометить сообщение как прочитанное
		 * @param [messageId]
		 */
		markRead: build.mutation<IMessage, string>({
			query: (messageId) => ({
				method: 'POST',
				url: getMessageUrl("/read"),
				body: {messageId}
			}),
			invalidatesTags: ['Message']
		}),

		/**
		 * Пометить сообщение как непрочитанное
		 * @param [messageId]
		 */
		markUnread: build.mutation<IMessage, string>({
			query: (messageId) => ({
				method: 'POST',
				url: getMessageUrl("/unread"),
				body: {messageId}
			}),
			invalidatesTags: ['Message']
		}),

	})
})