
import excel from 'exceljs';
import ejs from 'ejs';
import utils from '../helpers/utils.js';
import config from '../config.js';

async function exportListPage(records, req, res) {
		try{
			let format = req.query.export.toLowerCase();
			let columns =  [
				{ header: "Designation", key: "encaissementdetails_designation" },
				{ header: "Date", key: "date" },
				{ header: "Montant", key: "montant" },
				{ header: "Observation", key: "observation" },
				{ header: "Client", key: "id_client" },
				{ header: "User", key: "user_id" },
				{ header: "Facture", key: "id_facture" },
				{ header: "Unite de Location", key: "id_unite_location" },
				{ header: "Date Updated", key: "date_updated" },
				{ header: "Date Created", key: "date_created" },
				{ header: "Banque", key: "encaissementdetails_banque" },
				{ header: "Reference de paiement", key: "encaissementdetails_reference" },
				{ header: "Nom", key: "encaissementdetails_nom" },
				{ header: "Prénom", key: "encaissementdetails_prenom" },
				{ header: "Reçu de paiement", key: "encaissementdetails_recu" },
				{ header: "Status", key: "status" }
		]
		let filename = "encaissementexternes-report";

		if(format == "excel"){
			let workbook = new excel.Workbook();
			let worksheet = workbook.addWorksheet("Encaissement");
			worksheet.columns = columns;
			worksheet.addRows(records);

			// set all columns to autowidth
			utils.excelAutoWidth(worksheet);

			const headerRow = worksheet.getRow(1);
			headerRow.fill = { type: 'pattern', pattern:'solid', fgColor:{ argb:'f5b914' } }
			//headerRow.font = { name: 'Arial', size: 12 }

			res.setHeader("Content-Disposition", `attachment; filename=${filename}.xlsx`);
			return workbook.xlsx.write(res).then(function () {
				res.status(200).end();
			})
		}
		else if(format == "csv"){
			let workbook = new excel.Workbook();
			let worksheet = workbook.addWorksheet("Encaissement");
			worksheet.columns = columns;
			worksheet.addRows(records);
			res.setHeader("Content-Disposition", `attachment; filename=${filename}.csv`);
			return workbook.csv.write(res).then(function () {
				res.status(200).end();
			});
		}
		else if (format == "pdf" || format == "print") {
			let page = "encaissementexternes.ejs";
			
			//pass data to views
			const viewData = {
				records, 
				page, 
				config, 
				utils
			}
			
			let html = await ejs.renderFile("views/layouts/report.ejs", viewData);
			if (format == "pdf") {
				const pdfConfig = {
					margin: { top: '0', right: '0', bottom: '0', left: '0' },
					printBackground: true,
					format: 'A4',
					//landscape: true,
				}
				return res.generatePdf(html, filename, pdfConfig, 'screen');
			}
			else {
				return res.ok(html);
			}
		}
	}
	catch(err){
		return res.serverError(err);
	}
}
export default exportListPage;
