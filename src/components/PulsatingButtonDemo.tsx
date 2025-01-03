import PulsatingButton from "../components/magicui/pulsating-button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
 
export function PulsatingButtonDemo() {
    const navigate = useNavigate()
      function onClick (): void {
        const token = localStorage.getItem('token')
        if (!token) {
          toast.warn('Login First', {
            position: 'top-right'
          })
        }
        navigate('/publish')
      }
  return <PulsatingButton  onClick={onClick}>Write</PulsatingButton>;
}