import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal'; 
import Button from 'react-bootstrap/Button';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import '../../style/delete.css'

const DeleteModal = ({getDatas,deleteclose, dlt,id}) => {

    const [remove, setRemove] = useState(id)


    useEffect(() => {
      setRemove(id)
    }, [id])
  

    const [show, setShow] = useState(dlt)

    useEffect(() => {
      setShow(dlt)
    }, [dlt])
  
    const handleModalClose = () => {
        deleteclose()
        setShow(false)
      }

    const onDelete = (_id) => {
        axios.patch(`http://localhost:3000/enquiryType/${_id}`)
          .then(() => {
            if (response.status === 200) {
                toast.success('User Successfully Deleted !', {
                  toastId: 'success',
                  position: toast.POSITION.TOP_RIGHT,
                })
              }
            getDatas();
          })
          .catch((error) => {
            console.error('Error deleting data:', error);
          });
      };
    




      return (
        <>
        <Modal show={show} backdrop="static" centered onHide={handleModalClose} animation={false} dialogClassName="delete-modal" >
          <Modal.Header closeButton >
            <Modal.Title>Delete Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center fw-bold">
            Are you sure want to delete ?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" className="text-white" onClick={handleModalClose}>
              Cancel
            </Button>
            <Button
              variant="success"
              className="text-white"
              onClick={() => {
                onDelete(remove); 
                handleModalClose();
              }}
            >
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      )
}

export default DeleteModal