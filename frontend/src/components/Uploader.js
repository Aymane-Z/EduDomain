import React, { useState, useRef, useEffect } from "react";
import { FileUpload } from 'primereact/fileupload';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import useUtils from 'hooks/useUtils';
import useLocalStore from 'hooks/useLocalStore';
import useApi from 'hooks/useApi';
import { ImageViewer } from "./ImageViewer";



const Uploader = (props) => {

	const utils = useUtils();
	const api = useApi();
	const localStore = useLocalStore();

	const toast = useRef(null);

	const [uploadedFilePaths, setUploadedFilePaths] = useState([]);
	const [uploadedFiles, setUploadedFiles] = useState([]);
	const [disabled, setDisabled] = useState(false);


	const [totalSize, setTotalSize] = useState(0);
    const fileUploadRef = useRef(null);
    
    const onTemplateSelect = (e) => {
        let _totalSize = totalSize;
        let files = e.files;

        Object.keys(files).forEach((key) => {
            _totalSize += files[key].size || 0;
        });

        setTotalSize(_totalSize);
    };

    const onTemplateUpload = (e) => {
        let _totalSize = 0;

        e.files.forEach((file) => {
            _totalSize += file.size || 0;
        });

        setTotalSize(_totalSize);
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };

    const onTemplateRemove = (file, callback) => {
        setTotalSize(totalSize - file.size);
        callback();
    };

    const onTemplateClear = () => {
        setTotalSize(0);
    };




	useEffect(() => {
		if (props.value) {
			let prevUploadPaths = props.value.toString().split(',');
			setUploadedFilePaths(prevUploadPaths);
		}
	}, [props.value]);

	const maxFileSize = props.maxFileSize || 10;// in mb
	const fileLimit = props.fileLimit || 10;
	const multiple = props.multiple;
	const accept = props.accept;

	const maxFileSizeInBytes = maxFileSize * 1024 * 1024;

	function buildUploadedFiles() {
		let files = [];
		uploadedFilePaths.forEach(path => {
			let fileName = path.split('\\').pop().split('/').pop();
			let ext = fileName.split('.').pop().toLowerCase();
			let imgExt = ['jpg', 'png', 'gif', 'jpeg', 'bmp'];
			let isImage = false;
			if (imgExt.indexOf(ext) > -1) {
				isImage = true;
			}
			let size = "small"; //use resize image for the display
			if (path.indexOf("temp/") > -1) {
				size = "";  //if image is still in temp folder use the original image
			}
			let fileShortName = utils.strEllipsis(fileName, 15);
			files.push({
				name: fileName,
				shortName: fileShortName,
				isImage: isImage,
				size: size,
				path: path
			})
		});
		setUploadedFiles(files);
		
	}

	function getUploadApiUrl() {
		return utils.setApiPath(props.uploadPath);
	}
	function setheaders(event) {
		const token = localStore.getToken();
		event.xhr.setRequestHeader("Authorization", `Bearer ${token}`);
	}
	function uploadComplete(event) {
		const response = event.xhr.response;
		uploadedFilePaths.push(response);
		setUploadedFilePaths(uploadedFilePaths);
		updateModelValue();
		props.onUploadCompleted(response);
		if (fileUploadRef.current) {
			console.log(fileUploadRef.current.files);  // Accessing files directly
		}
	}

	function updateModelValue() {
		props.onChange(uploadedFilePaths.toString());
	}

	async function removeFile(file) {
		try {
			let index = uploadedFilePaths.indexOf(file.path);
			if (index !== -1) {
				uploadedFilePaths.splice(index, 1);
				setUploadedFilePaths(uploadedFilePaths);
				buildUploadedFiles();
				updateModelValue();
				let url = "fileuploader/remove_temp_file";
				let formData = {
					temp_file: file.path
				}
				await api.post(url, formData)
			}
		}
		catch (err) {
			console.error(err);
		}
	}




	function uploadError(req) {
		const errMsg = req?.xhr?.response || "Unable to upload file";
		props.onUploadError(errMsg);
		if (fileUploadRef.current) {
			console.log(fileUploadRef.current.files);  // Accessing files directly
		}
	}

	useEffect(() => {
		buildUploadedFiles();
		if (uploadedFilePaths.length >= fileLimit) {
			setDisabled(true)
		}
		else {
			setDisabled(false)
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [uploadedFilePaths, uploadedFilePaths.length, fileLimit]);

	function UploadedItemsTemplate() {
		if (props.showUploadedFiles) {
			if (uploadedFiles.length) {
				return (
					<div className="flex gap-2 flex-wrap py-2">
						{uploadedFiles.map(file =>
							<div key={file.path}>
								{file.isImage && <div className="card flex justify-content-between gap-2 align-items-center p-1">
									<ImageViewer width="40px" height="40px" imageSize="small" src={file.path} />
									<Button type="button" className="p-button-danger p-button-sm p-button-text" onClick={() => removeFile(file)} icon="pi pi-times" />
								</div>}
								{!file.isImage && <div className="flex card p-1 gap-2 justify-content-between align-items-center p-1">
									<a target="_blank" rel="noreferrer" href={utils.getFileFullPath(file.path)}>
										<Avatar size="large" icon="pi pi-file" />
									</a>
									<span className="text-sm text-500">{file.shortName}</span>
									<Button type="button" className="p-button-danger p-button-sm p-button-text" onClick={() => removeFile(file)} icon="pi pi-times" />
								</div >}
							</div>
						)}
					</div >
				)
			}

		}
		return null;
	}

	const emptyTemplate = () => {
        return (
            <div className="flex justify-content-center align-items-center gap-3 text-500">
                <i className="pi pi-upload text-5xl"></i>
                <span className="font-bold">{ props.label }</span>
            </div>
        )
    }
	const customBase64Uploader = async (event) => {
        // convert file to base64 encoded
        const file = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

        reader.readAsDataURL(blob);

        reader.onloadend = function () {
            const base64data = reader.result;
        };
    };




	return (
		<div className="p-2 surface-200">
			
			<FileUpload
				disabled={disabled}
				name="file"
				ref={fileUploadRef}
				auto={true}
				maxFileSize={maxFileSizeInBytes}
				accept={accept}
				multiple={multiple}
				mode="basic"
				url={getUploadApiUrl()}
				onBeforeSend={setheaders}
				onUpload={uploadComplete}
				onError={uploadError}
				emptyTemplate={emptyTemplate}
				
				>
			</FileUpload>
			
			<UploadedItemsTemplate />
		</div>
	)
}

Uploader.defaultProps = {
	onChange: () => { },
	onUploadCompleted: () => { },
	onUploadError: () => { },
}

export { Uploader }
