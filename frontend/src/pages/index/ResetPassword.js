import { useSearchParams } from 'react-router-dom';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import useApp from 'hooks/useApp';

import usePostForm from 'hooks/usePostForm';
export default function ResetPassword() {
		const app = useApp();
	const [searchParams] = useSearchParams();
	const formUrl = "auth/resetpassword";
	let token = searchParams.get("token");
	const formData = {
		password: "",
		confirm_password: "",
		token,
	}
	const validationSchema = yup.object().shape({
		password: yup.string().required().label(`Password`),
		confirm_password: yup.string().required().label(`Confirm Password`).oneOf([yup.ref('password')], 'Your passwords do not match.'),
	});
	function afterSubmit(data) {
		app.navigate("/index/resetpassword_completed");
	}
	const form = {
		formUrl, formData, validationSchema, afterSubmit
	}
	const { loading, errorMsg, formik, getFieldError, getErrorClass} = usePostForm(form);
	return (
		<div className="container">
			<div className="grid justify-content-center">
				<div className="col md:col-5">
					<div className="card">
						<div className="my-3">
							<div className="text-2xl font-bold">{$t('passwordReset')}</div>
						</div>
						{ errorMsg && <Message severity="error" text={errorMsg} /> }
						<form onSubmit={formik.handleSubmit}>
							<div className="formgrid mb-3">
								<Password inputClassName="w-full" className={classNames('w-full', getErrorClass('password'))} name="password" id="password" feedback toggleMask value={formik.values.password} onChange={formik.handleChange} placeholder={$t('newPassword')} />
								{getFieldError('password')}
							</div>
							<div className="formgrid mb-3">
								<Password inputClassName="w-full" className={classNames('w-full', getErrorClass('confirm_password'))} name="confirm_password" id="confirm_password" feedback={false} toggleMask value={formik.values.confirm_password} onChange={formik.handleChange} placeholder={$t('confirmNewPassword')}
							 />
							 {getFieldError('confirm_password')}
							</div>
							<div className="text-center">
								<Button type="submit" loading={loading} label={$t('changePassword')} />
							</div>
						</form>
					</div>
				</div>
			</div >
		</div >
	);
}