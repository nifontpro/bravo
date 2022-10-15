import {queryWithReauth} from "@/core/data/base.api";
import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {getRewardUrl} from "@/core/config/api.config";
import {IdResponse} from "@/core/model/idResponse.types";
import {INomineeRequest, IReward} from "../model/reward.types";
import {IRewardInfo} from "../model/rewardInfo";

export const rewardApi = createApi({
	reducerPath: 'rewardApi',
	baseQuery: queryWithReauth,
	tagTypes: ['Reward'],
	endpoints: (build) => ({

		nominee: build.mutation<IdResponse, INomineeRequest>({
			query: (request) => ({
				method: 'POST',
				url: getRewardUrl("/nominee"),
				body: request
			}),
			invalidatesTags: ['Reward']
		}),

		putSignature: build.mutation<void, string>({
			query: (rewardId) => ({
				method: 'PUT',
				url: getRewardUrl("/signature"),
				params: {rewardId}
			}),
			invalidatesTags: ['Reward']
		}),

		active: build.mutation<void, string>({
			query: (rewardId) => ({
				method: 'POST',
				url: getRewardUrl("/active"),
				params: {rewardId}
			}),
			invalidatesTags: ['Reward']
		}),

		getUserRewards: build.query<IReward[], string>({
			query: (userId) => ({
				method: 'POST',
				url: getRewardUrl("/user"),
				body: {userId}
			}),
			providesTags: ['Reward']
		}),

		getRewardById: build.query<IReward, string>({
			query: (rewardId) => ({
				method: 'POST',
				url: getRewardUrl(),
				body: {rewardId}
			}),
			providesTags: ['Reward']
		}),

		getRewardInfo: build.query<IRewardInfo, string>({
			query: (rewardId) => ({
				method: 'POST',
				url: getRewardUrl("/info"),
				body: {rewardId}
			}),
			providesTags: ['Reward']
		}),

		getRewardCountByCompany: build.query<number, string>({
			query: (companyId) => ({
				method: 'POST',
				url: getRewardUrl("/count_c"),
				body: {companyId}
			}),
			providesTags: ['Reward']
		}),
	})
})