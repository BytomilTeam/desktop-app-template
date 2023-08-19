import { useState } from 'react';
import { Flex, Paper, Button, TextInput, Box, Notification } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

const { ipcRenderer } = window.require("electron");

function App() {
  const [label, setLabel] = useState("")
  const [text, setText] = useState("No te conozco :(")
  const [isAuthed, setIsAuthed] = useState(false)
  const [opacity, setOpacity] = useState(0)

  function handleClick() {
    ipcRenderer.send("buttonClicked", label)
  }

  function handlePress(e){
    if(e.key === 'Enter'){
      handleClick()
    }
  }

  ipcRenderer.on("auth", (e, name) => {
    if(name){
      setText(`Hola ${name} uwu`)
      setOpacity(1)
      setIsAuthed(true)

    } else {
      setText("No te conozco :(")
      setOpacity(1)
      setIsAuthed(false)
      
    }
  })

  return (
    <Box className="App" bg="blue" m={0} p={0} w="100vw" h="100%" pos="absolute">
      <Flex justify="center">
      <Notification opacity={opacity} style={{transition:"200ms all"}} icon={isAuthed ? <IconCheck size="1.1rem" /> : <IconX size="1.1rem"/>} w="50vw" color={isAuthed ? "teal" : "red"} title="Autorización" mt={10} pos="absolute" withCloseButton={false}>{text}</Notification>
      <Flex justify="center" align="center" direction="column" h="100vh" w="100vw" m={10}>
          <Paper w="50vw" shadow='xl' p='md' radius="lg" withBorder>
            <Flex w="100%" justify="center" align="center" gap="md" >
              <TextInput onKeyDown={handlePress} placeholder='Introduce tu nametag' w="100%" type="text" value={label} onChange={(e) => setLabel(e.target.value)}/>
              <Button onClick={handleClick}>Send</Button>
            </Flex>
          </Paper>
      </Flex>
      </Flex>
    </Box>
  );
}

export default App;
