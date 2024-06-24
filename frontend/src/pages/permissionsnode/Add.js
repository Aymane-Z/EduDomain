import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { DataSource } from 'components/DataSource';
import { InputText } from 'primereact/inputtext';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApi from 'hooks/useApi';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const PermissionsnodeAddPage = (props) => {
		const app = useApp();
	const api = useApi();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		role_id: yup.string().nullable().label($t('role')),
		page_name: yup.string().required().label($t('pageName')),
		action_name: yup.string().required().label($t('actionName'))
	});
	
	//form default values
	const formDefaultValues = {
		role_id: '', 
		page_name: '', 
		action_name: '', 
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
			app.navigate(`/permissionsnode`);
		}
	}
	
	//auto fill other inputs on page_name change
	async function pageNameAutoFill(e, formik, index) {
		formik.handleChange(e);
		const val = e.target.value;
		const resp = await api.get(`components_data/permissionsnode_page_name_autofill?value=${val}`);
		const data = resp.data[0];
		if(data){
formik.setFieldValue('page_name', data.page_name);
		}
	};
	
	//auto fill other inputs on action_name change
	async function actionNameAutoFill(e, formik, index) {
		formik.handleChange(e);
		const val = e.target.value;
		const resp = await api.get(`components_data/permissionsnode_action_name_autofill?value=${val}`);
		const data = resp.data[0];
		if(data){
formik.setFieldValue('action_name', data.action_name);
		}
	};
	
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
<main id="PermissionsnodeAddPage" className="main-page">
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
                    <Title title={$t('addNewPermissionsnode')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                                                {$t('role')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="role_id"  onChange={formik.handleChange}  value={formik.values.role_id}   label={$t('role')} type="text" placeholder={$t('enterRole')}        className={inputClassName(formik?.errors?.role_id)} />
                                                <DataSource   apiPath="components_data/role_id_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <datalist id="role_id_list">
                                                    { response.map((option, index)=> <option key={index} value={option.value}>{option.label}</option>)}
                                                    </datalist>
                                                    </>
                                                    }
                                                </DataSource>
                                                <ErrorMessage name="role_id" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('pageName')} *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="page_name"  onChange={(e)=>pageNameAutoFill(e, formik)}  value={formik.values.page_name}   label={$t('pageName')} type="text" placeholder={$t('enterPageName')}        className={inputClassName(formik?.errors?.page_name)} />
                                                <ErrorMessage name="page_name" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('actionName')} *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="action_name"  onChange={(e)=>actionNameAutoFill(e, formik)}  value={formik.values.action_name}   label={$t('actionName')} type="text" placeholder={$t('enterActionName')}        className={inputClassName(formik?.errors?.action_name)} />
                                                <ErrorMessage name="action_name" component="span" className="p-error" />
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
PermissionsnodeAddPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'permissionsnode',
	apiPath: 'permissionsnode/add',
	routeName: 'permissionsnodeadd',
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
export default PermissionsnodeAddPage;
