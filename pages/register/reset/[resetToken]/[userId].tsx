import React from 'react';
import {NextPage} from "next";
import {useRouter} from "next/router";

const ResetPasswordPage: NextPage = () => {

	const router = useRouter();

	return (
		<div>
			Token: {router.query.resetToken}
			UserId: {router.query.userId}
		</div>
	);
};

export default ResetPasswordPage;