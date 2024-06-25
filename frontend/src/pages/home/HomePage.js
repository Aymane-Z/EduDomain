import { useState } from 'react';
import { $t } from 'hooks/i18n';
import { Chart } from 'primereact/chart';
import { DataSource } from 'components/DataSource';
import { Title } from 'components/Title';

export default function HomePage() {
	
	const [pageReady, setPageReady] = useState(true);
	return (
		<main id="HomePage" className="main-page">
<section className="page-section q-pa-md" >
    <div className="container-fluid">
        <div className="grid ">
            <div className="col comp-grid" >
                <Title title={$t('home')}   titleClass="text-lg font-bold text-primary" subTitleClass="text-500"      separator={false} />
            </div>
        </div>
    </div>
</section>
<section className="page-section mb-3" >
    <div className="container-fluid">
        <div className="grid ">
            <div className="col-6 sm:col-4 lg:col-4 md:col-4 comp-grid" >
                <div className="card  s">
                    <div className="q-pa-md">
                        <div className="font-bold text-lg">Etats des Unités</div>
                        <div className="text-500"></div>
                        <hr />
                        <div className="row q-col-gutter-sm">
                            <div className="col">
                            <DataSource   apiPath="components_data/piechart_etatsdesunits"  >
                                    {
                                    ({ response }) => 
                                    <>
                                    <Chart data={response} type="pie" options={{
                                    scales: {
                                    y: {
                                    title: {
                                    display: true,
                                    text: $t('')
                                    }
                                    },
                                    x: {
                                    title: {
                                    display: true,
                                    text: $t('')
                                    }
                                    }
                                    }
                                    }
                                    }  />
                                    </>
                                    }
                                </DataSource>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-6 sm:col-4 lg:col-4 md:col-4 comp-grid" >
                <div className="card  s">
                    <div className="q-pa-md">
                        <div className="font-bold text-lg">Taux d'occupation</div>
                        <div className="text-500"></div>
                        <hr />
                        <div className="row q-col-gutter-sm">
                            <div className="col">
                            <DataSource   apiPath="components_data/occupancy_rate"  >
                                    {
                                    ({ response }) => 
                                    <>
                                    <Chart data={response} type="bar" options={{
                                    maintainAspectRatio: false,
                                    aspectRatio: 0.7,
                                    scales: {
                                    y: {
                                        stacked: true,
                                    title: {
                                    display: true,
                                    text: $t('')
                                    }
                                    },
                                    x: {
                                        stacked: true,
                                    title: {
                                    display: true,
                                    text: $t('')
                                    }
                                    }
                                    }
                                    }
                                    }  />
                                    </>
                                    }
                                </DataSource>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
		</main>
	);
}
