import { $t } from 'hooks/i18n';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

export default function AccountPending() {
    
    return (<div className="container">
        <div className="grid justify-content-center">
            <div className="col md:col-5">
                <div className="text-center card">
                    <Avatar size="large" className="bg-orange-500 text-white" icon="pi pi-user" />
                    <div className="text-3xl font-bold text-orange-500 my-3">
                        {$t('promptAccountInReview')}
                    </div>
                    <div className="text-500">
                        {$t('contactSystemAdmin')}
                    </div>
                    <hr />
                    <Link to="/">
                        <Button label={$t('continue')} icon="pi pi-home" />
                    </Link>
                </div>
            </div>
        </div>
    </div>
    );
}
