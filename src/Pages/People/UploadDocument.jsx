import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Drawer, TextField } from '@mui/material';
import { FiUpload } from 'react-icons/fi';
import { Spin, Alert } from 'antd';
import FolderGrid from './FolderGrid';
import OpenFolderScreen from './OpenFolderScreen';
import { useFolderContents, useFileUploader, useFolderCreator, useFileDeleter, useFolderDeleter } from '../../Hooks/useDrive';
import { toast } from 'react-toastify';
import { IoEllipsisVertical } from "react-icons/io5";
import api from '../../axios';
import { select } from '@material-tailwind/react';

const UploadDocument = () => {
  const [folderStack, setFolderStack] = useState([]); // Stack to hold navigation path
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [folderMenuOpen, setFolderMenuOpen] = useState(-1);
  const [fileMenuOpen, setFileMenuOpen] = useState(-1);
  const data = useSelector((state) => state);
  const { user } = data?.auth;

  const currentFolder = folderStack[folderStack.length - 1] || { id: 'root', name: 'Root' };
  console.log(folderStack)
  const folderId = currentFolder._id;
  const folderPath = `users/${user.id}/${folderStack.map(f => f.id).join('/') || 'root'}`;

  const { folders, files, loading, error, reload } = useFolderContents(folderId);
  const { create, loading: creating, error: createErr } = useFolderCreator();
  const { upload, loading: uploading, error: uploadErr } = useFileUploader();
  const { softDelete: deleteFile ,loading:fileDeleteLoading,error:fileDeleteError} = useFileDeleter();
const { softDelete: deleteFolder,loading:folderDeleteLoading,error:folderDeleteError } = useFolderDeleter();
  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const handleNewFolder = async () => {
    if (!folderName.trim()) {
      toast.error("Folder name is required");
      return;
    }
    try {
      await create({ name: folderName, parentId: folderId, ownerId: user.id });
      setFolderName('');
      setDrawerOpen(false);
      reload();
    } catch (err) {
      toast.error("Failed to create folder");
    }
  };

  const handleFileChange = async (e) => {
    console.log("uploading file",e.target.files[0])
    const file = e.target.files[0];
    if (!file) return;
    try {
      await upload({ file, folderId, folderPath });
      reload();
    } catch (err) {
      toast.error("File upload failed");
    }
  };

  const handleOpenFolder = (folder) => {
    setFolderStack([...folderStack, folder]);
  };
const handleDeleteFile = async (fileId) => {
  if (!window.confirm("Are you sure you want to delete this file?")) return;
  try {
    await deleteFile(fileId);
    toast.success("File deleted");
    reload(); // 👈 refresh contents
  } catch {
    toast.error("Failed to delete file");
  }
};

const handleDeleteFolder = async (folderId) => {
  console.log('deleting folder')
  if (!window.confirm("Are you sure you want to delete this folder?")) return;
  try {
    await deleteFolder(folderId);
    toast.success("Folder deleted");
    reload(); // 👈 refresh contents
  } catch {
    toast.error("Failed to delete folder");
  }
};

  const handleGoBack = () => {
    if (folderStack.length === 0) return;
    setFolderStack(folderStack.slice(0, -1));
  };
    // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
     setFolderMenuOpen(-1)
     setFileMenuOpen(-1)
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (error) return <Alert message={error.message} type="error" />;

  return (
    <>
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <div className="w-full sm:w-80 md:w-96 h-full bg-white p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-800">Create Folder</h2>
          <TextField
            label="Folder Name"
            variant="outlined"
            fullWidth
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            size="small"
          />
          <button
            onClick={handleNewFolder}
            disabled={creating}
            className="mt-2 bg-[#497a71] text-white text-sm py-2 rounded-md hover:bg-[#99c7be] hover:text-black"
          >
            {creating ? 'Creating…' : 'Create Folder'}
          </button>
          {createErr && <Alert message={createErr.message} type="error" />}
        </div>
      </Drawer>

      <div className="min-h-screen bg-primary p-2 sm:p-4 mx-2 my-4 sm:m-6 rounded-lg shadow-md">
        <div className="flex flex-col mb-5 bg-white rounded-lg px-4 py-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between w-full">
            <div className="flex flex-wrap items-center gap-3 mb-3 sm:mb-0">
              <div className="flex items-center space-x-2">
                <label className="text-sm">Show</label>
                <select className="text-sm px-2 py-1 bg-secondary rounded-md">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                <span className="text-sm">entries</span>
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="border-0 px-3 py-1.5 rounded-md shadow-md w-64 text-sm bg-secondary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
              <label htmlFor="file-upload" className="cursor-pointer bg-[#497a71] text-white text-sm px-4 py-2 rounded-md hover:bg-[#99c7be] hover:text-black">
                Upload Files
              </label>
              <button
                onClick={toggleDrawer(true)}
                className="flex items-center gap-2 bg-[#497a71] text-white text-sm px-4 py-2 rounded-md hover:bg-[#99c7be] hover:text-black"
              >
                <FiUpload /> New Folder
              </button>
              {folderStack.length > 0 && (
                <button
                  onClick={handleGoBack}
                  className="bg-gray-300 text-sm px-4 py-2 rounded-md hover:bg-gray-400"
                >
                  Go Back
                </button>
              )}
            </div>
          </div>
        </div>

        {uploadErr && <Alert message={uploadErr.message} type="error" />}

        <Spin spinning={loading||uploading||creating||fileDeleteLoading||folderDeleteLoading}>
          
          {/* <div className="mb-4 overflow-x-auto">
            <FolderGrid
              folders={folders.filter(f =>
                f.name.toLowerCase().includes(searchTerm.toLowerCase())
              )}
              onOpenFolder={handleOpenFolder}
            />
            {/* You can also render files here */}
          {/* </div> */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
  {/* Folders */}
  {folders.map((folder,index) => (
    <div key={folder.id} onClick={(e) => {
      e.stopPropagation()
      handleOpenFolder(folder)
    }}
     className="flex justify-between items-center bg-white rounded p-4 shadow cursor-pointer">
      📁 {folder.name}
       <div className='relative'>
      <IoEllipsisVertical onClick={(e)=>{
        e.stopPropagation();
        setFolderMenuOpen(t=>t==index?-1:index)


      }} />
      {
        folderMenuOpen==index&&(
           <div  className="absolute left-4 top-8 z-50 bg-white border border-gray-200 rounded shadow w-32">
          <button
            onClick={(e) => { 
              e.stopPropagation()
              setFolderMenuOpen(-1);  
            }}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Update
          </button>
          <button
            onClick={() => { setFolderMenuOpen(-1); handleDeleteFolder(folder._id); }}
            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
        )
      }
      </div>
    </div>
  ))}

  {/* Files */}
  {files.map((file,index) => (
    <div key={file.id} className="flex justify-between items-center bg-white rounded p-4 shadow">
      📄 {file.name}
      <div className='relative'>
      <IoEllipsisVertical onClick={(e)=>{
        e.stopPropagation()
        setFileMenuOpen(t=>t==index?-1:index)}} />
 {
        fileMenuOpen==index&&(
           <div  className="absolute left-4 top-2 z-50 bg-white border border-gray-200 rounded shadow w-32">
          <button
            onClick={(e) => { 
              e.stopPropagation()
              setFolderMenuOpen(-1);  
            }}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
          >
            Update
          </button>
          <button
            onClick={() => { setFileMenuOpen(-1); handleDeleteFile(file?._id); }}
            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
          >
            Delete
          </button>
        </div>
        )
      }
      </div>
    </div>
  ))}
</div>
        </Spin>

      </div>
    </>
  );
};

export default UploadDocument;
