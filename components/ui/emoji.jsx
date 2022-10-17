import dynamic from 'next/dynamic';
const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

function Emoji() {
  return (
    <div>
      <EmojiPicker
        onEmojiClick={(x) => {
          console.log(x);
        }}
      />
    </div>
  );
}

export default Emoji;
