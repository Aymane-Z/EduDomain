import { Formik, Form, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { DataSource } from 'components/DataSource';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
import { RadioButton } from 'primereact/radiobutton';
import { Title } from 'components/Title';
import useApp from 'hooks/useApp';

import useAddPage from 'hooks/useAddPage';
const EtageAddPage = (props) => {
		const app = useApp();
	
	//form validation rules
	const validationSchema = yup.object().shape({
		code: yup.string().nullable().label($t('code')),
		denomination: yup.string().nullable().label($t('denomination')),
		description: yup.string().nullable().label($t('description')),
		nombre_chambres: yup.number().nullable().label($t('nombreChambres')),
		acces_handicape: yup.string().nullable().label($t('accesHandicape')),
		amenagements_speciaux: yup.string().nullable().label($t('amenagementsSpeciaux')),
		id_pavillon: yup.string().nullable().label($t('pavillon'))
	});
	
	//form default values
	const formDefaultValues = {
		code: '', 
		denomination: '', 
		description: '', 
		nombre_chambres: '', 
		acces_handicape: '', 
		amenagements_speciaux: '', 
		id_pavillon: '', 
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
			app.navigate(`/etage`);
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
<main id="EtageAddPage" className="main-page">
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
                    <Title title={$t('addNewEtage')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
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
                                                {$t('nombreChambres')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputText name="nombre_chambres"  onChange={formik.handleChange}  value={formik.values.nombre_chambres}   label={$t('nombreChambres')} type="number" placeholder={$t('enterNombreChambres')}  min={0}  step="any"    className={inputClassName(formik?.errors?.nombre_chambres)} />
                                                <ErrorMessage name="nombre_chambres" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('accesHandicape')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                {
                                                app.menus.accesHandicape.map((option) => {
                                                return (
                                                <div key={option.value} className="field-radiobutton">
                                                    <RadioButton inputId={option.value} name="acces_handicape" value={option.value} onChange={formik.handleChange}  checked={formik.values.acces_handicape === option.value} className={inputClassName(formik?.errors?.acces_handicape, '')} />
                                                    <label htmlFor={option.value}>{option.label}</label>
                                                </div>
                                                )
                                                })
                                                }
                                                <ErrorMessage name="acces_handicape" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('amenagementsSpeciaux')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <InputTextarea name="amenagements_speciaux"  className={inputClassName(formik?.errors?.amenagements_speciaux)}   value={formik.values.amenagements_speciaux} placeholder={$t('enterAmenagementsSpeciaux')} onChange={formik.handleChange}   >
                                                </InputTextarea>
                                                <ErrorMessage name="amenagements_speciaux" component="span" className="p-error" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="formgrid grid">
                                            <div className="col-12 md:col-3">
                                                {$t('pavillon')} 
                                            </div>
                                            <div className="col-12 md:col-9">
                                                <DataSource   apiPath="components_data/id_pavillon_option_list"  >
                                                    {
                                                    ({ response }) => 
                                                    <>
                                                    <Dropdown  name="id_pavillon"     optionLabel="label" optionValue="value" value={formik.values.id_pavillon} onChange={formik.handleChange} options={response} label={$t('pavillon')}  placeholder={$t('selectAValue')} filter={true} className={inputClassName(formik?.errors?.id_pavillon)}   />
                                                    <ErrorMessage name="id_pavillon" component="span" className="p-error" />
                                                    </>
                                                    }
                                                </DataSource>
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
EtageAddPage.defaultProps = {
	primaryKey: 'id',
	pageName: 'etage',
	apiPath: 'etage/add',
	routeName: 'etageadd',
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
export default EtageAddPage;
