import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import { Uploader } from 'components/Uploader';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const UtilisateursAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		username: yup.string().required().label($t('username')),
		password: yup.string().required().label($t('password')),
		confirm_password: yup.string().required().label($t('confirmPassword')).oneOf([yup.ref('password')], $t('yourPasswordsDoNotMatch')),
		email: yup.string().email().nullable().label($t('email')),
		photo: yup.string().nullable().label($t('photo')),
		user_role_id: yup.string().nullable().label($t('userRoleId'))
	});
	
	//form default values
	const formDefaultValues = {
		username: '', 
		password: '', 
		confirm_password: '', 
		email: '', 
		photo: '', 
		user_role_id: '', 
	}
	
	//page hook where logics resides
	const pageController =  useAddPage({ props, formDefaultValues, afterSubmit });
	
	// destructure and grab what the page needs
	const { formData, resetForm, handleSubmit, submitForm, pageReady, loading, saving, inputClassName } = pageController;
	
	//event raised after form submit
	function afterSubmit(response){
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		resetForm();
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigate(`/utilisateurs`);
		}
	}
	
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
<main id="UtilisateursAddPage" className="main-page">
    { (props.showHeader) && 
    <section className="page-section mb-3" >
        <div className="container">
            <div className="grid justify-content-between align-items-center">
                { !props.isSubPage && 
                <div className="col-fixed " >
                    <Button onClick={() => app.navigate(-1)} label={$t('')}  className="p-button p-button-text " icon="pi pi-arrow-left"  />
                </div>
                }
                <div className="col " >
                    <Title title={$t('addNewUtilisateur')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
            </div>
        </div>
    </section>
    }
    <section className="page-section " >
        <div className="container">
            <div className="grid ">
                <div className="md:col-9 sm:col-12 comp-grid" >
                    <div >
                        <Formik initialValues={formData} validationSchema={validationSchema} onSubmit={(values, actions) =>submitForm(values)}>
                            {(formik) => 
                            <>
                            <Form className={`${!props.isSubPage ? 'card  ' : ''}`}>
                                <div className="grid">
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('username')} *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="username"  onChange={formik.handleChange}  value={formik.values.username}   label={$t('username')} type="text" placeholder={$t('enterUsername')}        className={inputClassName(formik?.errors?.username)} />
                                                <ErrorMessage name="username" component="span" className="p-error" />
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
                                                {$t('email')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="email"  onChange={formik.handleChange}  value={formik.values.email}   label={$t('email')} type="email" placeholder={$t('enterEmail')}        className={inputClassName(formik?.errors?.email)} />
                                                <ErrorMessage name="email" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('photo')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <div className={inputClassName(formik?.errors?.photo)}>
                                                    <Uploader name="photo" showUploadedFiles value={formik.values.photo} uploadPath="fileuploader/upload/photo" onChange={(paths) => formik.setFieldValue('photo', paths)} fileLimit={1} maxFileSize={3} accept=".jpg,.png,.gif,.jpeg" multiple={false} label={$t('chooseFilesOrDropFilesHere')} onUploadError={(errMsg) => app.flashMsg('Upload error', errMsg, 'error')} />
                                                </div>
                                                <ErrorMessage name="photo" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('userRoleId')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="user_role_id"  onChange={formik.handleChange}  value={formik.values.user_role_id}   label={$t('userRoleId')} type="text" placeholder={$t('enterUserRoleId')}        className={inputClassName(formik?.errors?.user_role_id)} />
                                                <ErrorMessage name="user_role_id" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                { props.showFooter && 
                                <div className="text-center my-3">
                                    <Button onClick={(e) => handleSubmit(e, formik)} className="p-button-primary" type="submit" label={$t('soumettre')} icon="pi pi-send" loading={saving} />
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
UtilisateursAddPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'utilisateurs',
	apiPath: 'utilisateurs/add',
	routeName: 'utilisateursadd',
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
export default UtilisateursAddPage;
