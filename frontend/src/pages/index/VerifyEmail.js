import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import useApp from 'hooks/useApp';

import usePostForm from 'hooks/usePostForm';
export default function VerifyEmail(){
		const app = useApp();
	const [searchParams] = useSearchParams();
	const formUrl = "auth/resendverifyemail";
	const [sentMsg, setSentMsg] = useState('Email verification link sent to your mailbox');
	let token = searchParams.get("token");
	const formData = {
		token,
	}
	const validationSchema = yup.object().shape({
		token: yup.string().required(),
	});
	function afterSubmit(data){
		app.flashMsg('Success', data, 'success');
		//setSentMsg(data);
	}
	const form = {
		formUrl, formData, validationSchema, afterSubmit
	}
	const { data, loading, errorMsg, formik } = usePostForm(form);
	return (
		<div className="container">
			<div className="grid justify-content-center">
				<div className="col-12 md:col-6">
					<div className="card text-center">
						<Avatar className="bg-green-700 text-green-100" size="large" icon="pi pi-check-circle" />
						<div className="text-2xl mt-3  font-bold text-green-500"> 
							{sentMsg}
						</div>
						<div className="text-500">
							{$t('verifyEmailLinkMsg')}
						</div>
						<hr />
						{errorMsg && <Message className="my-3" severity="error" text={errorMsg} />} 
						<form onSubmit={formik.handleSubmit}>
							<div className="text-center">
								<Button label={$t('resendEmail')} type="submit" icon="pi pi-envelope" loading={loading} />
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
