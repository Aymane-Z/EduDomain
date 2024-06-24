import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { Menubar } from 'primereact/menubar';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toolbar } from 'primereact/toolbar';
import { Title } from 'components/Title';
import ProprietaireViewPage from 'pages/proprietaire/View';
import ResidenceEditPage from 'pages/residence/Edit';
import ResponsableViewPage from 'pages/responsable/View';
import useApp from 'hooks/useApp';
import useAuth from 'hooks/useAuth';
import React, { useRef } from 'react';
import { SplitButton } from 'primereact/splitbutton';
import { IconField } from 'primereact/iconfield';
import { Toast } from 'primereact/toast';
import { Panel } from 'primereact/panel';
import { Card } from 'primereact/card';
import useViewPage from 'hooks/useViewPage';
import MasterDetailPages from './MasterDetailPages';
import { useNavigate } from 'react-router-dom';
const ResidenceViewPage = (props) => {
		const auth = useAuth();
	const app = useApp();
    const toast = useRef(null);
	const pageController = useViewPage(props);
	const { item, currentRecord, pageReady, loading, apiRequestError, deleteItem, moveToNextRecord, moveToPreviousRecord } = pageController;
    const history = useNavigate();
    const pageExportFormats =  [
		'pdf'
	];
    const items = [
        {
            label: 'Libérer les Unités',
            icon: 'pi pi-lock-open',
            command: () => {
                toast.current.show({ severity: 'success', summary: 'Unités Libérés', detail: 'Data Updated' });
            }
        },
        {
            label: 'Mettre les Unités en Hors Service',
            icon: 'pi pi-times',
            command: () => {
                toast.current.show({ severity: 'warn', summary: 'Unités Hors Service', detail: 'Data Updated' });
            }
        },
        {
            label: 'Réserver les Unités',
            icon: 'pi pi-lock',
            command: () => {
                window.location.href = 'https://reactjs.org/';
            }
        }
    ];
    const save = () => {
        history("/unitelocation/add");
    };
    const items1 = [
        {
            label: 'Ajouter un Client',
            icon: 'pi pi-user-plus',
            command: () => {
                toast.current.show({ severity: 'success', summary: 'Unités Libérés', detail: 'Data Updated' });
            }
        },
        {
            label: 'Réclamations',
            icon: 'pi pi-exclamation-triangle',
            command: () => {
                toast.current.show({ severity: 'warn', summary: 'Unités Hors Service', detail: 'Data Updated' });
            }
        },
        {
            label: 'Documents',
            icon: 'pi pi-file',
            command: () => {
                window.location.href = 'https://reactjs.org/';
            }
        }
    ];
    const save1 = () => {
        history("/client");
    };
	function ActionButton(data){
		const items = [
		{
			label: $t('edit'),
			command: (event) => { app.openPageDialog(<ResidenceEditPage isSubPage apiPath={`/residence/edit/${data.id}`} />, {closeBtn: true }) },
			icon: "pi pi-pencil",
			visible: () => auth.canView('residence/edit')
		},
		{
			label: $t('delete'),
			command: (event) => { deleteItem(data.id) },
			icon: "pi pi-trash",
			visible: () => auth.canView('residence/delete')
		}
	]
	.filter((item) => {
		if(item.visible){
			return item.visible()
		}
		return true;
	});
		return (<Menubar className="p-0 " model={items} />);
	}
	function PageFooter() {
		if (props.showFooter) {
			return (
				<div className="flex justify-content-between">
					{props.exportButton && <Button icon="pi pi-print" className="mx-xs" title={$t('export')} /> }
	<div className="flex justify-content-start">
	{ActionButton(item)}
	</div>
	<div className="flex align-items-center justify-content-center py-3">
		<div className="mx-1">
			<Button disabled={!item.previousRecordId} onClick={()=>moveToPreviousRecord()} icon="pi pi-arrow-left"   />
		</div>
		<div className="mx-1">
			<Button disabled={!item.nextRecordId} onClick={()=>moveToNextRecord()} icon-pos="right" icon="pi pi-arrow-right"  />
		</div>
	</div>
				</div>
			);
		}
	}
    const startContent = (
        <React.Fragment>
            <div className="mx-1">
            {
            <Button  onClick={()=>moveToPreviousRecord()} icon="pi pi-arrow-left"   />
            }</div>
            <div className="mx-1">
            {
            <Button  onClick={()=>moveToNextRecord()} icon-pos="right" icon="pi pi-arrow-right"  />
            }
            </div>
        </React.Fragment>
    );

    const centerContent = (
        <div className="flex justify-content-start">
        <IconField iconPosition="left">
            <div className="flex justify-content-start">
	{ActionButton(item)}
	</div>
            
        </IconField></div>
    );

    const endContent = (
        <React.Fragment>
            <Toast ref={toast}></Toast>
            <div className="mx-1"><SplitButton label="Nouvelle Unitée de Location" icon="pi pi-plus" onClick={save} model={items} rounded /></div>
            <div className="mx-1"><SplitButton label="List des Clients" icon="pi pi-plus" onClick={save1} model={items1} rounded /></div>
            <div className="mx-1">{props.exportButton && <Button icon="pi pi-print" className="mx-xs" title={$t('export')} /> }</div>
            
            
            
        </React.Fragment>
    );
	if(loading){
		return (
			<div className="p-3 text-center">
				<ProgressSpinner style={{width:'50px', height:'50px'}} />
			</div>
		);
	}
	if(apiRequestError){
		return (
			<PageRequestError error={apiRequestError} />
		);
	}
	if(pageReady){
		return (
			<div>
<main id="ResidenceViewPage" className="main-page">
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
                    <Title title={$t('residenceDetails')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>

                
            </div>
        </div>
    </section>
    }
    <section className="page-section mb-3">
    <div >               
            <Toolbar start={startContent} center={centerContent} end={endContent} />
            
                </div>
                
                
                
    </section>
    <section className="page-section " >
        <div className="container">
            <div className="grid">
                <div className="col comp-grid" >
                    <div >
                        <div className="grid ">
                            <div className="col">
                                {/*PageComponentStart*/}
                                
                                <div className="mb-3 grid card" >
                                    <div className="col-12 md:col-8">
                                <Title title={$t('Details')}   titleClass="text-xl text-primary font-bold" subTitleClass="text-500"      separator={true} />
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('code')}</div>
                                                <div className="font-bold">{ item.code }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('denomination')}</div>
                                                <div className="font-bold">{ item.denomination }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('dateMiseEnService')}</div>
                                                <div className="font-bold">{ item.dt_mise_service }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('adresse')}</div>
                                                <div className="font-bold">{ item.adresse }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('tlphone1')}</div>
                                                <div className="font-bold">{ item.tel1 }</div>
                                            </div>
                                        </div>
                                    </div>
                                    {item.tel2 &&
                                    <div className="col-12 md:col-6">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('tlphone2')}</div>
                                                <div className="font-bold">{ item.tel2 }</div>
                                            </div>
                                        </div>
                                    </div>}
                                    {item.tel3 &&
                                    <div className="col-12 md:col-6">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('tlphone3')}</div>
                                                <div className="font-bold">{ item.tel3 }</div>
                                            </div>
                                        </div>
                                    </div>}
                                    <div className="col-12 md:col-6">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('responsable')}</div>
                                                <div className="font-bold">{item.id_responsable && <Button className="p-button-text" icon="pi pi-eye" label={$t('responsableDetail')} onClick={() => app.openPageDialog(<ResponsableViewPage isSubPage apiPath={`/responsable/view/${item.id_responsable}`} />, {closeBtn: true })} /> }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 md:col-6">
                                        <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                            <div className="">
                                                <div className="text-400 font-medium mb-1">{$t('proprietaire')}</div>
                                                <div className="font-bold">{item.id_proprietaire && <Button className="p-button-text" icon="pi pi-eye" label={item.proprietaire_denomination} onClick={() => app.openPageDialog(<ProprietaireViewPage isSubPage apiPath={`/proprietaire/view/${item.id_proprietaire}`} />, {closeBtn: true })} /> }</div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                
                                
                                {/*PageComponentEnd*/}
                            </div>
                            {
                            (currentRecord && !props.isSubPage) && 
                            <div className="col-6">
                                <Panel ref={toast} header="Liste des sous-composantes" toggleable>
                                <div style={{ overflowX: 'auto', width: '100%' }}>
                                    <MasterDetailPages masterRecord={currentRecord} scrollIntoView={false} />
                                </div>
                                </Panel>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

				
			</div>
		);
	}
}
ResidenceViewPage.defaultProps = {
	id: null,
	primaryKey: 'id',
	pageName: 'residence',
	apiPath: 'residence/view',
	routeName: 'residenceview',
	msgBeforeDelete: $t('tesVousSrDeVouloirSupprimerCetEnregistrement'),
	msgTitle: $t('deleteRecord'),
	msgAfterDelete: $t('enregistrementSupprimAvecSuccs'),
	showHeader: true,
	showFooter: true,
	exportButton: true,
	isSubPage: false,
}
export default ResidenceViewPage;
