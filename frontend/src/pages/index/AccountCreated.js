import { $t } from 'hooks/i18n';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

export default function AccountCreated() {
    
    return (<div className="container">
        <div className="grid justify-content-center">
            <div className="col md:col-5">
                <div className="text-center card">
                    <Avatar size="large" className="bg-green-500 text-white" icon="pi pi-check-circle" />
                    <div className="text-3xl my-3 font-bold text-green-500 my-3">
                        {$t('congratulations')}
                    </div>
                    <div className="text-2xl text-500">
                        {$t('promptAccountCreated')}
                    </div>
                    <hr />
                    <Link to="/">
                        <Button label={$t('continue')} icon="pi pi-home" />
                    </Link>
                </div>
            </div>
        </div>
    </div>);
}