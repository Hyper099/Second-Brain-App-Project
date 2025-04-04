
import './App.css';
import { PlusIcon } from './components/Icons/PlusIcon';
import { ShareIcon } from './components/Icons/ShareIcon';
import { Button } from './components/ui/Button';

function App() {

  function shareFunction() {
    alert("Share button clicked");
  }
  function addContent() {
    alert("content add button clicked");
  }

  return (
    <>
      <Button variant='primary' size='md' text='Share' startIcon={<ShareIcon size='md'/>} onclick={shareFunction} />
      <Button variant='secondary' size='md' text='Add Content' startIcon={<PlusIcon size='md'/>} onclick={addContent} />
    </>
  )
}

export default App
