import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';

import usePostForm from 'hooks/usePostForm';
export default function ForgotPassword(){
	
	const formUrl = "auth/forgotpassword";
	const formData = {
		email: '',
	}
	const validationSchema = yup.object().shape({
		email: yup.string().required().label(`Email`),
	});
	const form = {
		formUrl, formData, validationSchema
	}
	const { data, loading, errorMsg, formik } = usePostForm(form);
	return (<div className="grid justify-content-center">
		<div className="col md:col-5">
			<div className="card">
				<div className="my-3">
					<div className="text-2xl font-bold">{$t('passwordReset')}</div>
					<small className="text-500">
						{$t('promptForValidEmail')}
					</small>
				</div>
				{ data && <Message severity="success" text={data} className="w-full mb-3" /> }
				<form onSubmit={formik.handleSubmit}>
					{ errorMsg && <Message severity="error" text={errorMsg} /> }
					<div className="grid align-items-center justify-content-between">
						<div className="col">
							<InputText id="email" name="email" className="w-full" value={formik.values.email} onChange={formik.handleChange} placeholder={$t('email')} required type="email" />
						</div>
						<div className="col-auto">
							<Button loading={loading} type="submit" label={$t('send')} icon="pi pi-envelope" />
						</div>
					</div>
				</form>
				<hr />
				<div className="text-primary">
					{$t('passwordResetLinkMsg')}
				</div>
			</div>
		</div>
	</div>);
}