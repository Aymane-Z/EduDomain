import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import { Uploader } from 'components/Uploader';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
const UsersEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		user_id: yup.string().nullable().label($t('userId')),
		username: yup.string().required().label($t('username')),
		email: yup.string().email().required().label($t('email')),
		date_registered: yup.string().required().label($t('dateRegistered')),
		photo: yup.string().nullable().label($t('photo')),
		user_role: yup.string().required().label($t('userRole')),
		user_role_id: yup.string().nullable().label($t('userRoleId'))
	});
	// form default values
	const formDefaultValues = {
		user_id: '', 
		username: '', 
		email: '', 
		date_registered: new Date(), 
		photo: '', 
		user_role: '', 
		user_role_id: '', 
	}
	//where page logics resides
	const pageController = useEditPage({ props, formDefaultValues, afterSubmit });
	//destructure and grab what we need
	const { formData, handleSubmit, submitForm, pageReady, loading, saving, apiRequestError, inputClassName } = pageController
	//Event raised on form submit success
	function afterSubmit(response){
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigate(`/users`);
		}
	}
	// loading form data from api
	if(loading){
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{width:'50px', height:'50px'}} />
			</div>
		);
	}
	//display error page 
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	//page is ready when formdata loaded successfully
	if(pageReady){
		return (
<main id="UsersEditPage" className="main-page">
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
                    <Title title={$t('editUser')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                        <Formik
                            initialValues={formData}
                            validationSchema={validationSchema} 
                            onSubmit={(values, actions) => {
                            submitForm(values);
                            }
                            }
                            >
                            { (formik) => {
                            return (
                            <Form className={`${!props.isSubPage ? 'card  ' : ''}`}>
                                <div className="grid">
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('userId')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="user_id"  onChange={formik.handleChange}  value={formik.values.user_id}   label={$t('userId')} type="text" placeholder={$t('enterUserId')}        className={inputClassName(formik?.errors?.user_id)} />
                                                <ErrorMessage name="user_id" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
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
                                                {$t('email')} *
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
                                                {$t('dateRegistered')} *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <Calendar name="date_registered" showButtonBar className={inputClassName(formik?.errors?.date_registered)} dateFormat="yy-mm-dd" value={formik.values.date_registered} onChange={formik.handleChange} showIcon        />
                                                <ErrorMessage name="date_registered" component="span" className="p-error" />
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
                                                {$t('userRole')} *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="user_role"  onChange={formik.handleChange}  value={formik.values.user_role}   label={$t('userRole')} type="text" placeholder={$t('enterUserRole')}        className={inputClassName(formik?.errors?.user_role)} />
                                                <ErrorMessage name="user_role" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('userRoleId')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/role_id_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="user_role_id"     optionLabel="label" optionValue="value" value={formik.values.user_role_id} onChange={formik.handleChange} options={response} label={$t('userRoleId')}  placeholder={$t('selectAValue')}  className={inputClassName(formik?.errors?.user_role_id)}   />
                                                    <ErrorMessage name="user_role_id" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                { props.showFooter && 
                                <div className="text-center my-3">
                                    <Button onClick={(e) => handleSubmit(e, formik)}  type="submit" label={$t('modifier')} icon="pi pi-send" loading={saving} />
                                </div>
                                }
                            </Form>
                            );
                            }
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
UsersEditPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'users',
	apiPath: 'users/edit',
	routeName: 'usersedit',
	submitButtonLabel: $t('modifier'),
	formValidationError: $t('formIsInvalid'),
	formValidationMsg: $t('pleaseCompleteTheForm'),
	msgTitle: $t('updateRecord'),
	msgAfterSave: $t('enregistrementMisJourAvecSuccs'),
	msgBeforeSave: $t(''),
	showHeader: true,
	showFooter: true,
	redirect: true,
	isSubPage: false
}
export default UsersEditPage;
