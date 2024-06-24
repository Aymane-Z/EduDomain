import { $t } from 'hooks/i18n';
import { Button } from 'primereact/button';
import { ImageViewer } from 'components/ImageViewer';
import { Menubar } from 'primereact/menubar';
import { PageRequestError } from 'components/PageRequestError';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Title } from 'components/Title';
import RolesViewPage from 'pages/roles/View';
import useApp from 'hooks/useApp';
import useAuth from 'hooks/useAuth';
import UsersEditPage from 'pages/users/Edit';

import useViewPage from 'hooks/useViewPage';
const UsersViewPage = (props) => {
		const auth = useAuth();
	const app = useApp();
	const pageController = useViewPage(props);
	const { item, pageReady, loading, apiRequestError, deleteItem, moveToNextRecord, moveToPreviousRecord } = pageController;
	const pageExportFormats =  [
		'pdf'
	];
	function ActionButton(data){
		const items = [
		{
			label: $t('edit'),
			command: (event) => { app.openPageDialog(<UsersEditPage isSubPage apiPath={`/users/edit/${data.id}`} />, {closeBtn: true }) },
			icon: "pi pi-pencil",
			visible: () => auth.canView('users/edit')
		},
		{
			label: $t('delete'),
			command: (event) => { deleteItem(data.id) },
			icon: "pi pi-trash",
			visible: () => auth.canView('users/delete')
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
<main id="UsersViewPage" className="main-page">
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
                    <Title title={$t('userDetails')}   titleClass="text-2xl text-primary font-bold" subTitleClass="text-500"      separator={false} />
                </div>
            </div>
        </div>
    </section>
    }
    <section className="page-section " >
        <div className="container">
            <div className="grid ">
                <div className="col comp-grid" >
                    <div >
                        {/*PageComponentStart*/}
                        <div className="mb-3 grid ">
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">{$t('id')}</div>
                                        <div className="font-bold">{ item.id }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">{$t('userId')}</div>
                                        <div className="font-bold">{ item.user_id }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">{$t('username')}</div>
                                        <div className="font-bold">{ item.username }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">{$t('email')}</div>
                                        <div className="font-bold">{ item.email }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">{$t('dateRegistered')}</div>
                                        <div className="font-bold">{ item.date_registered }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">{$t('photo')}</div>
                                        <div className="font-bold"><ImageViewer imageSize="medium" previewSize="" src={item.photo} width="auto" height="auto" numDisplay={1} style={{maxWidth:'100%'}} /></div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">{$t('userRole')}</div>
                                        <div className="font-bold">{ item.user_role }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">{$t('dateCreated')}</div>
                                        <div className="font-bold">{ item.date_created }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">{$t('dateUpdated')}</div>
                                        <div className="font-bold">{ item.date_updated }</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-4">
                                <div className="card flex gap-3 align-items-center card shadow-none p-3 surface-100 ">
                                    <div className="">
                                        <div className="text-400 font-medium mb-1">{$t('userRoleId')}</div>
                                        <div className="font-bold">{item.user_role_id && <Button className="p-button-text" icon="pi pi-eye" label={$t('rolesDetail')} onClick={() => app.openPageDialog(<RolesViewPage isSubPage apiPath={`/roles/view/${item.user_role_id}`} />, {closeBtn: true })} /> }</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*PageComponentEnd*/}
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
				<PageFooter />
			</div>
		);
	}
}
UsersViewPage.defaultProps = {
	id: null,
	primaryKey: 'id',
	pageName: 'users',
	apiPath: 'users/view',
	routeName: 'usersview',
	msgBeforeDelete: $t('tesVousSrDeVouloirSupprimerCetEnregistrement'),
	msgTitle: $t('deleteRecord'),
	msgAfterDelete: $t('enregistrementSupprimAvecSuccs'),
	showHeader: true,
	showFooter: true,
	exportButton: true,
	isSubPage: false,
}
export default UsersViewPage;
