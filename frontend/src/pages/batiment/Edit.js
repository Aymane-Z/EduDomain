import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useEditPage from 'hooks/useEditPage';
import MasterDetailPages from './MasterDetailPages';
const BatimentEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		code: yup.string().required().label($t('code')),
		type: yup.string().nullable().label($t('type')),
		denomination: yup.string().nullable().label($t('denomination')),
		description: yup.string().nullable().label($t('description')),
		nombre_niveaux: yup.number().nullable().label($t('nombreNiveaux')),
		nombre: yup.number().nullable().label($t('nombre')),
		id_residence: yup.string().nullable().label($t('residence'))
	});
	// form default values
	const formDefaultValues = {
		code: '', 
		type: '', 
		denomination: '', 
		description: '', 
		nombre_niveaux: '', 
		nombre: '', 
		id_residence: '', 
	}
	//where page logics resides
	const pageController = useEditPage({ props, formDefaultValues, afterSubmit });
	//destructure and grab what we need
	const { formData, currentRecord, handleSubmit, submitForm, pageReady, loading, saving, apiRequestError, inputClassName } = pageController
	//Event raised on form submit success
	function afterSubmit(response){
		app.flashMsg(props.msgTitle, props.msgAfterSave);
		if(app.isDialogOpen()){
			app.closeDialogs(); // if page is open as dialog, close dialog
		}
		else if(props.redirect) {
			app.navigate(`/batiment`);
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
<main id="BatimentEditPage" className="main-page">
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
                    <Title title={$t('editBatiment')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                        <div className="grid ">
                            <div className="col">
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
                                                        {$t('code')} *
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <InputText name="code"  onChange={formik.handleChange}  value={formik.values.code}   label={$t('code')} type="text" placeholder={$t('enterCode')}        className={inputClassName(formik?.errors?.code)} />
                                                        <ErrorMessage name="code" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('type')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <InputText name="type"  onChange={formik.handleChange}  value={formik.values.type}   label={$t('type')} type="text" placeholder={$t('enterType')}        className={inputClassName(formik?.errors?.type)} />
                                                        <ErrorMessage name="type" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('denomination')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <InputText name="denomination"  onChange={formik.handleChange}  value={formik.values.denomination}   label={$t('denomination')} type="text" placeholder={$t('enterDenomination')}        className={inputClassName(formik?.errors?.denomination)} />
                                                        <ErrorMessage name="denomination" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('description')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <InputText name="description"  onChange={formik.handleChange}  value={formik.values.description}   label={$t('description')} type="text" placeholder={$t('enterDescription')}        className={inputClassName(formik?.errors?.description)} />
                                                        <ErrorMessage name="description" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('nombreNiveaux')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <InputText name="nombre_niveaux"  onChange={formik.handleChange}  value={formik.values.nombre_niveaux}   label={$t('nombreNiveaux')} type="number" placeholder={$t('enterNombreNiveaux')}  min={0}  step="any"    className={inputClassName(formik?.errors?.nombre_niveaux)} />
                                                        <ErrorMessage name="nombre_niveaux" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('nombre')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <InputText name="nombre"  onChange={formik.handleChange}  value={formik.values.nombre}   label={$t('nombre')} type="number" placeholder={$t('enterNombre')}  min={0}  step="any"    className={inputClassName(formik?.errors?.nombre)} />
                                                        <ErrorMessage name="nombre" component="span" className="p-error" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="formgrid grid">
                                                    <div className="col-12 md:col-3">
                                                        {$t('residence')} 
                                                    </div>
                                                    <div className="col-12 md:col-9">
                                                        <DataSource   apiPath="components_data/id_residence_option_list_2"  >
                                                            {
                                                            ({ response }) => 
                                                            <>
                                                            <Dropdown  name="id_residence"     optionLabel="label" optionValue="value" value={formik.values.id_residence} onChange={formik.handleChange} options={response} label={$t('residence')}  placeholder={$t('selectAValue')}  className={inputClassName(formik?.errors?.id_residence)}   />
                                                            <ErrorMessage name="id_residence" component="span" className="p-error" />
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
                                {
                                (currentRecord && !props.isSubPage) && 
                                <div className="col-12">
                                    <div className="card my-3">
                                        <MasterDetailPages masterRecord={currentRecord} scrollIntoView={false} />
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
		);
	}
}
BatimentEditPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'batiment',
	apiPath: 'batiment/edit',
	routeName: 'batimentedit',
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
export default BatimentEditPage;
