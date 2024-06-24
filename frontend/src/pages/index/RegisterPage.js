import { Formik, Form, ErrorMessage } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { CheckDuplicate } from 'components/CheckDuplicate';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { Link } from 'react-router-dom';
import { Password } from 'primereact/password';
import { ProgressSpinner } from 'primereact/progressspinner';
import { RadioButton } from 'primereact/radiobutton';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';
import useAuth from 'hooks/useAuth';

import useAddPage from 'hooks/useAddPage';
import ReCAPTCHA from 'react-google-recaptcha';
const RegisterPage = (props) => {
		const auth = useAuth();
	const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		civilite: yup.string().nullable().label($t('civilite')),
		username: yup.string().required().label($t('username')),
		nom: yup.string().nullable().label($t('nom')),
		prenom: yup.string().nullable().label($t('prnom')),
		cin: yup.string().nullable().label($t('nCin')),
		nationalite: yup.string().nullable().label($t('nationalite')),
		email: yup.string().email().required().label($t('email')),
		password: yup.string().required().label($t('password')),
		confirm_password: yup.string().required().label($t('confirmPassword')).oneOf([yup.ref('password')], $t('yourPasswordsDoNotMatch')),
		telephone: yup.string().required().label($t('telephone'))
	});
	
	//form default values
	const formDefaultValues = {
		civilite: '', 
		username: '', 
		nom: '', 
		prenom: '', 
		cin: '', 
		nationalite: '', 
		email: '', 
		password: '', 
		confirm_password: '', 
		telephone: '', 
	}
	
	//page hook where logics resides
	const pageController =  useAddPage({ props, formDefaultValues, afterSubmit });
	
	// destructure and grab what the page needs
	const { formData, resetForm, handleSubmit, submitForm, pageReady, loading, saving, inputClassName } = pageController;
	
	//event raised after form submit
	function afterSubmit(response){
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		resetForm();
		const nextPage = response.nextpage || '/home';
		if (response.token) {
			auth.login(response.token, false);
			app.navigate(nextPage);
		}
		else{
			app.navigate(nextPage);
		}
	}
const [recaptchaToken, setRecaptchaToken] = useState('');
	
	// page loading form data from api
	if(loading){
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{width:'50px', height:'50px'}} />
			</div>
		);
	}
	
	//page has loaded any required data and ready to render
	if(pageReady){
		return (
<main id="UsersnodeUserregisterPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3 mb-3" >
        <div className="container">
            <div className="grid justify-content-between align-items-center">
                { !props.isSubPage && 
                <div className="col-fixed " >
                    <Button onClick={() => app.navigate(-1)} label={$t('')}  className="p-button p-button-text " icon="pi pi-arrow-left"  />
                </div>
                }
                <div className=" col " >
                    <Title title={$t('userRegistration')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
                <div className="col-12 md:col-4 comp-grid" >
                    <div className="">
                        <div className="flex align-items-center">
                            <div>{$t('alreadyHaveAnAccount')}</div>
                            <div className="ml-2">
                                <Link to="/">
                                    <Button icon="pi pi-user" label={$t('login')} /> 
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        }
        <section className="page-section " >
            <div className="container">
                <div className="grid justify-content-center">
                    <div className="md:col-7 sm:col-12 comp-grid" >
                        <div >
                            <Formik initialValues={formData} validationSchema={validationSchema} onSubmit={(values, actions) =>submitForm(values)}>
                                {(formik) => 
                                <>
                                <Form className={`${!props.isSubPage ? 'card  ' : ''}`}>
                                    <div className="grid">
                                        <div className="col-12">
                                            <div className="formgrid grid">
                                                <div className="col-12 md:col-3">
                                                    {$t('civilite')} 
                                                </div>
                                                <div className="col-12 md:col-9">
                                                    <div className="flex flex-wrap">
                                                        {
                                                        app.menus.civilite.map((option) => {
                                                        return (
                                                        <div key={option.value} className="field-radiobutton  mx-3">
                                                            <RadioButton inputId={option.value} name="civilite" value={option.value} onChange={formik.handleChange}  checked={formik.values.civilite === option.value} className={inputClassName(formik?.errors?.civilite, '')} />
                                                            <label htmlFor={option.value}>{option.label}</label>
                                                        </div>
                                                        )
                                                        })
                                                        }
                                                    </div>
                                                    <ErrorMessage name="civilite" component="span" className="p-error" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="formgrid grid">
                                                <div className="col-12 md:col-3">
                                                    {$t('username')} *
                                                </div>
                                                <div className="col-12 md:col-9">
                                                    <CheckDuplicate value={formik.values.username} apiPath="components_data/usersnode_username_exist">
                                                    { (checker) => 
                                                    <>
                                                    <InputText name="username" onBlur={checker.check} onChange={formik.handleChange}  value={formik.values.username}   label={$t('username')} type="text" placeholder={$t('enterUsername')}        className={inputClassName(formik?.errors?.username)} />
                                                    <ErrorMessage name="username" component="span" className="p-error" />
                                                    {(!checker.loading && checker.exist) && <small className="p-error">{$t('notAvailable')}</small>}
                                                    {checker.loading && <small className="text-500">Checking...</small> }
                                                    </>
                                                    }
                                                    </CheckDuplicate>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="formgrid grid">
                                                <div className="col-12 md:col-3">
                                                    {$t('nom')} 
                                                </div>
                                                <div className="col-12 md:col-9">
                                                    <InputText name="nom"  onChange={formik.handleChange}  value={formik.values.nom}   label={$t('nom')} type="text" placeholder={$t('enterNom')}        className={inputClassName(formik?.errors?.nom)} />
                                                    <ErrorMessage name="nom" component="span" className="p-error" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="formgrid grid">
                                                <div className="col-12 md:col-3">
                                                    {$t('prnom')} 
                                                </div>
                                                <div className="col-12 md:col-9">
                                                    <InputText name="prenom"  onChange={formik.handleChange}  value={formik.values.prenom}   label={$t('prnom')} type="text" placeholder={$t('enterPrnom')}        className={inputClassName(formik?.errors?.prenom)} />
                                                    <ErrorMessage name="prenom" component="span" className="p-error" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="formgrid grid">
                                                <div className="col-12 md:col-3">
                                                    {$t('nCin')} 
                                                </div>
                                                <div className="col-12 md:col-9">
                                                    <CheckDuplicate value={formik.values.cin} apiPath="components_data/usersnode_cin_exist">
                                                    { (checker) => 
                                                    <>
                                                    <InputText name="cin" onBlur={checker.check} onChange={formik.handleChange}  value={formik.values.cin}   label={$t('nCin')} type="text" placeholder={$t('enterNCin')}        className={inputClassName(formik?.errors?.cin)} />
                                                    <ErrorMessage name="cin" component="span" className="p-error" />
                                                    {(!checker.loading && checker.exist) && <small className="p-error">{$t('notAvailable')}</small>}
                                                    {checker.loading && <small className="text-500">Checking...</small> }
                                                    </>
                                                    }
                                                    </CheckDuplicate>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="formgrid grid">
                                                <div className="col-12 md:col-3">
                                                    {$t('nationalite')} 
                                                </div>
                                                <div className="col-12 md:col-9">
                                                    <Dropdown  name="nationalite"     optionLabel="label" optionValue="value" value={formik.values.nationalite} onChange={formik.handleChange} options={app.menus.paysClient} label={$t('nationalite')}  placeholder={$t('selectAValue')} filter={true} className={inputClassName(formik?.errors?.nationalite)}   />
                                                    <ErrorMessage name="nationalite" component="span" className="p-error" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="formgrid grid">
                                                <div className="col-12 md:col-3">
                                                    {$t('email')} *
                                                </div>
                                                <div className="col-12 md:col-9">
                                                    <CheckDuplicate value={formik.values.email} apiPath="components_data/usersnode_email_exist">
                                                    { (checker) => 
                                                    <>
                                                    <InputText name="email" onBlur={checker.check} onChange={formik.handleChange}  value={formik.values.email}   label={$t('email')} type="email" placeholder={$t('enterEmail')}        className={inputClassName(formik?.errors?.email)} />
                                                    <ErrorMessage name="email" component="span" className="p-error" />
                                                    {(!checker.loading && checker.exist) && <small className="p-error">{$t('notAvailable')}</small>}
                                                    {checker.loading && <small className="text-500">Checking...</small> }
                                                    </>
                                                    }
                                                    </CheckDuplicate>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="formgrid grid">
                                                <div className="col-12 md:col-3">
                                                    {$t('password')} *
                                                </div>
                                                <div className="col-12 md:col-9">
                                                    <Password name="password" value={formik.values.password} onChange={formik.handleChange} label={$t('password')} placeholder={$t('enterPassword')}  inputClassName="w-full" toggleMask feedback className={inputClassName(formik?.errors?.password)} />
                                                    <ErrorMessage name="password" component="span" className="p-error" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="formgrid grid">
                                                <div className="col-12 md:col-3">
                                                    {$t('confirmPassword')} *
                                                </div>
                                                <div className="col-12 md:col-9">
                                                    <Password name="confirm_password" id="confirm_password" className={inputClassName(formik?.errors?.comfirm_password)} inputClassName="w-full" feedback={false} toggleMask  value={formik.values.confirm_password} onChange={formik.handleChange} label={$t('confirmPassword')} placeholder={$t('confirmPassword')}  />
                                                    <ErrorMessage name="confirm_password" component="span" className="p-error" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <div className="formgrid grid">
                                                <div className="col-12 md:col-3">
                                                    {$t('telephone')} *
                                                </div>
                                                <div className="col-12 md:col-9">
                                                    <InputText name="telephone"  onChange={formik.handleChange}  value={formik.values.telephone}   label={$t('telephone')} type="text" placeholder={$t('enterUnNumroDeTlphone')}        className={inputClassName(formik?.errors?.telephone)} />
                                                    <ErrorMessage name="telephone" component="span" className="p-error" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <ReCAPTCHA
                                                        sitekey="6Lcq_ewpAAAAAAnZX3xHJD2sIQj8YNYokS_k9wYB"
                                                        onChange={(token) => setRecaptchaToken(token)}
                                                    />
                                    { props.showFooter && 
                                    <div className="text-center my-3">
                                        <Button disabled={!recaptchaToken || saving} onClick={(e) => handleSubmit(e, formik)} className="p-button-primary" type="submit" label={$t('soumettre')} icon="pi pi-send" loading={saving} />
                                    </div>
                                    }
                                </Form>
                                </>
                                }
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
		);
	}
}

//page props and default values
RegisterPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'usersnode',
	apiPath: 'auth/register',
	routeName: 'usersnodeuserregister',
	submitButtonLabel: $t('soumettre'),
	formValidationError: $t('formIsInvalid'),
	formValidationMsg: $t('pleaseCompleteTheForm'),
	msgTitle: $t('createRecord'),
	msgAfterSave: $t('enregistrementAjoutAvecSuccs'),
	msgBeforeSave: $t(''),
	showHeader: true,
	showFooter: true,
	redirect: true,
	isSubPage: false
}
export default RegisterPage;
