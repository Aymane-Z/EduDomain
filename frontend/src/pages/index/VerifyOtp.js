import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { Message } from 'primereact/message';
import useApi from 'hooks/useApi';
import useApp from 'hooks/useApp';
import useAuth from 'hooks/useAuth';

import usePostForm from 'hooks/usePostForm';
export default function VerifyOtp() {
		const auth = useAuth();
	const app = useApp();
	const api = useApi();
	const [searchParams] = useSearchParams();
	const [resending, setResending] = useState(false);
	const [canResend, setCanResend] = useState(false);
	const [countDown, setCountDown] = useState('');
	const formUrl = "/auth/validateotp";
	const token = searchParams.get("token");
	const formData = {
		otp_code: "",
		token,
	}
	const validationSchema = yup.object().shape({
		otp_code: yup.string().required().label(`OTP Code`)
	});
	const form = {
		formUrl, formData, validationSchema, afterSubmit
	}
	function afterSubmit(loginData) {
		if (loginData.token) {
			auth.login(loginData.token);
			app.navigate('/home'); //user is now logged in. Navigate to home page
		}
		else {
			app.navigate(loginData.nextpage)
		}
	}
	function startCountDown() {
		let duration = searchParams.get("duration");
		duration = parseInt(duration) || 5; // in minutes
		let minutes = 60 * duration;
		let timer = minutes;
		let seconds;
		const interval = setInterval(function () {
			minutes = parseInt(timer / 60, 10);
			seconds = parseInt(timer % 60, 10);
			minutes = minutes < 10 ? "0" + minutes : minutes;
			seconds = seconds < 10 ? "0" + seconds : seconds;
			setCountDown(minutes + ":" + seconds);
			if (--timer < 0) {
				clearInterval(interval);
				setErrorMsg("OTP has expired");
				setCanResend(true);
			}
		}, 1000);
	}
	async function resendOtp() {
		try{
			setResending(true);
			setErrorMsg(null);
			await api.post('/auth/resendotp', formData);
			setCanResend(false);
			startCountDown();
			app.flashMsg('Success', 'OTP Sent Successfully', 'success');
		}
		catch(error){
			console.log(error);
			const msg = error?.response?.data || "Unable to resend otp";
			app.flashMsg('Failed', msg, 'error');
		}
		finally{
			setResending(false);
		}
	}
	useEffect(() => {
		startCountDown();
	}, [token]);
	const { loading, errorMsg, setErrorMsg, formik, getFieldError, getErrorClass } = usePostForm(form);
	return (
		<>
			<div className="container">
				<div className="grid justify-content-center">
					<div className="col-12 md:col-5">
						<div className="card">
							<div className="mb-4">
								<div className="grid align-items-center justify-content-between">
									<div className="col-2">
										<Avatar className="bg-green-500 text-white" icon="pi pi-check-circle" size="large" />
									</div>
									<div className="col">
										<div className="text-2xl font-bold">{$t('otpVerification')}</div>
									</div>
									<div className="col-3">
										<div className="text-2xl font-bold text-info">{countDown}</div>
									</div>
								</div>
								<div className="text-primary"></div>
							</div>
							<form onSubmit={formik.handleSubmit}>
								<div className="grid justify-content-between">
									<div className="col">
										<InputText name="otp_code" id="otp_code" className={classNames('w-full text-center otp-input', getErrorClass('otp_code'))} placeholder={$t('enterOtp')} value={formik.values.otpCode} onChange={formik.handleChange} type="text" />
										{getFieldError('otp_code')}
									</div>
									<div className="col-3 tetx-right">
										<Button className="p-button-lg" loading={loading} type="submit" label={$t('verify')} />
									</div>
								</div>
								{ errorMsg && <Message severity="error" text={errorMsg} />}
								<div className="flex align-items-center justify-content-between">
									<div className="text-sm text-500">
										Didn't receive an OTP ?
									</div>
									<div>
										<Button className="p-button-text" disabled={!canResend} loading={resending} onClick={()=>resendOtp()} type="button" label="Resend..." />
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
			<style>
				{
				`
				.otp-input {
					font-weight: bold;
					font-size: 20px;
					text-align: center;
					letter-spacing: 10px;
				}
				.otp-input::placeholder {
					font-weight: normal;
					font-size: 14px;
					text-align: center;
					letter-spacing: 1px;
				}
				`
			}
			</style>
		</>
	);
}
