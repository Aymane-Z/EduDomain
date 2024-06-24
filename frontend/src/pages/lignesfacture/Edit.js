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
const LignesfactureEditPage = (props) => {
		const app = useApp();
	// form validation schema
	const validationSchema = yup.object().shape({
		code: yup.string().nullable().label($t('code')),
		designation: yup.string().nullable().label($t('designation')),
		description: yup.string().nullable().label($t('description')),
		montant: yup.number().required().label($t('montant')),
		id_facture: yup.string().nullable().label($t('facture')),
		id_base_tarif: yup.string().nullable().label($t('baseTarification'))
	});
	// form default values
	const formDefaultValues = {
		code: '', 
		designation: '', 
		description: '', 
		montant: '', 
		id_facture: '', 
		id_base_tarif: '', 
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
			app.navigate(`/lignesfacture`);
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
<main id="LignesfactureEditPage" className="main-page">
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
                    <Title title={$t('editLignesFacture')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                                                {$t('code')} 
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
                                                {$t('designation')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="designation"  onChange={formik.handleChange}  value={formik.values.designation}   label={$t('designation')} type="text" placeholder={$t('enterDesignation')}        className={inputClassName(formik?.errors?.designation)} />
                                                <ErrorMessage name="designation" component="span" className="p-error" />
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
                                                {$t('montant')} *
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="montant"  onChange={formik.handleChange}  value={formik.values.montant}   label={$t('montant')} type="number" placeholder={$t('enterMontant')}  min={0}  step={0.1}    className={inputClassName(formik?.errors?.montant)} />
                                                <ErrorMessage name="montant" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('facture')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/id_facture_option_list_2"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="id_facture"     optionLabel="label" optionValue="value" value={formik.values.id_facture} onChange={formik.handleChange} options={response} label={$t('facture')}  placeholder={$t('selectAValue')} filter={true} className={inputClassName(formik?.errors?.id_facture)}   />
                                                    <ErrorMessage name="id_facture" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('baseTarification')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/id_base_tarif_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="id_base_tarif"     optionLabel="label" optionValue="value" value={formik.values.id_base_tarif} onChange={formik.handleChange} options={response} label={$t('baseTarification')}  placeholder={$t('selectAValue')} filter={true} className={inputClassName(formik?.errors?.id_base_tarif)}   />
                                                    <ErrorMessage name="id_base_tarif" component="span" className="p-error" />
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
LignesfactureEditPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'lignesfacture',
	apiPath: 'lignesfacture/edit',
	routeName: 'lignesfactureedit',
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
export default LignesfactureEditPage;
