import ChatComponent from "@/components/chat/chatComponent";
import '@/app/globals.css'

export default function Chat()
{
	return (
		<div className="w-screen h-screen flex items-center justify-center bg-gradient-to-br from-DarkBg via-RhinoBlue to-ViolentViolet">
			<ChatComponent />
		</div>
	)
}