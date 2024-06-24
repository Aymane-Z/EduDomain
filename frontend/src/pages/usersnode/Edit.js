import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { CheckDuplicate } from 'components/CheckDuplicate';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import { Uploader } from 'components/Uploader';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
const UsersnodeEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		username: yup.string().required().label($t('username')),
		photo: yup.string().nullable().label($t('photo')),
		user_role_id: yup.string().nullable().label($t('userRoleId')),
		civilite: yup.string().nullable().label($t('civilite')),
		nom: yup.string().nullable().label($t('nom')),
		prenom: yup.string().nullable().label($t('prenom')),
		cin: yup.string().nullable().label($t('cin')),
		nationalite: yup.string().nullable().label($t('nationalite')),
		telephone: yup.string().nullable().label($t('telephone'))
	});
	// form default values
	const formDefaultValues = {
		username: '', 
		photo: '', 
		user_role_id: '', 
		civilite: '', 
		nom: '', 
		prenom: '', 
		cin: '', 
		nationalite: '', 
		telephone: '', 
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
			app.navigate(`/usersnode`);
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
<main id="UsersnodeEditPage" className="main-page">
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
                    <Title title={$t('editUsersnode')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                                                <DataSource   apiPath="components_data/user_role_id_option_list"  >
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
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('civilite')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="civilite"  onChange={formik.handleChange}  value={formik.values.civilite}   label={$t('civilite')} type="text" placeholder={$t('enterCivilite')}        className={inputClassName(formik?.errors?.civilite)} />
                                                <ErrorMessage name="civilite" component="span" className="p-error" />
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
                                                {$t('prenom')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="prenom"  onChange={formik.handleChange}  value={formik.values.prenom}   label={$t('prenom')} type="text" placeholder={$t('enterPrenom')}        className={inputClassName(formik?.errors?.prenom)} />
                                                <ErrorMessage name="prenom" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('cin')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="cin"  onChange={formik.handleChange}  value={formik.values.cin}   label={$t('cin')} type="text" placeholder={$t('enterCin')}        className={inputClassName(formik?.errors?.cin)} />
                                                <ErrorMessage name="cin" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('nationalite')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="nationalite"  onChange={formik.handleChange}  value={formik.values.nationalite}   label={$t('nationalite')} type="text" placeholder={$t('enterNationalite')}        className={inputClassName(formik?.errors?.nationalite)} />
                                                <ErrorMessage name="nationalite" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('telephone')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="telephone"  onChange={formik.handleChange}  value={formik.values.telephone}   label={$t('telephone')} type="text" placeholder={$t('enterTelephone')}        className={inputClassName(formik?.errors?.telephone)} />
                                                <ErrorMessage name="telephone" component="span" className="p-error" />
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
UsersnodeEditPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'usersnode',
	apiPath: 'usersnode/edit',
	routeName: 'usersnodeedit',
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
export default UsersnodeEditPage;
