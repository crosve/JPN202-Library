import React, { useState, useRef } from "react";
import { Input } from "@mantine/core";
import { Button, Card, Group } from "@mantine/core";
import { useTranslation } from "react-i18next";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import "../i18n";
import axios from "axios";
import { AxiosResponse } from "axios";

import VocabCard from "../components/VocabCard";
const JapaneseLayout = {
  default: [
    "ぬ ふ あ う え お や ゆ よ わ ほ へ",
    "た て い す か ん な に ら せ ゛ ゜",
    "ち と し は き く ま の り れ け む",
    "つ さ そ ひ こ み も ね る め ろ {bksp}",
    "{shift} や ゆ よ わ ん {space} {shift}",
  ],
  shift: [
    "ヌ フ ア ウ エ オ ヤ ユ ヨ ワ ホ ヘ",
    "タ テ イ ス カ ン ナ ニ ラ セ ゛ ゜",
    "チ ト シ ハ キ ク マ ノ リ レ ケ ム",
    "ツ サ ソ ヒ コ ミ モ ネ ル メ ロ {bksp}",
    "{shift} ヤ ユ ヨ ワ ン {space} {shift}",
  ],
};
interface VocabResults {
  translation: string;
  hiragana: string;
  kanji: string;
  vocabularyid: number;
}

const LandingPage = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>("en");
  const [inputText, setInputText] = useState("");
  const [layoutName, setLayoutName] = useState("default");
  const [keyboardVisible, setKeyboardVisible] = useState(true);
  const [vocabResult, setVocabResult] = useState<VocabResults | null>();
  const keyboard = useRef<any>("");

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "jp" : "en"));
  };

  const fetchVocabulary = async () => {
    try {
      await axios
        .get(`http://localhost:8080/v1/getVocabulary?query=${inputText}`)
        .then((response: AxiosResponse<any, any>) => {
          setVocabResult(response.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (input: string) => {
    setInputText(input);
    if (keyboard.current) {
      keyboard.current.setInput(input);
    }
  };

  const onKeyPress = (button: string) => {
    if (button === "{shift}") {
      setLayoutName(layoutName === "default" ? "shift" : "default");
    } else if (button === "{kana}") {
      setLayoutName(layoutName === "default" ? "shift" : "default");
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setInputText(input);
    if (keyboard.current) {
      keyboard.current.setInput(input);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-amber-50 py-16 text-black">
      <div className="max-w-4xl mx-auto p-8">
        <div className="flex flex-col items-center space-y-8">
          <h1 className="text-3xl font-semibold">Quick Vocabulary Search</h1>

          <div className="w-full flex flex-col items-center space-y-4">
            <div className="w-full h-full flex flex-col  md:flex-row items-center">
              <Input
                className="flex-1 bg-white w-full mb-4"
                value={inputText}
                onChange={onInputChange}
                variant="filled"
                size="lg"
                radius="xl"
                placeholder={
                  language === "en"
                    ? "Enter your text..."
                    : "テキストを入力してください..."
                }
              />
              <Button
                onClick={toggleLanguage}
                variant="filled"
                radius="xl"
                className="h-12"
              >
                {t("switch")}
              </Button>
              <Button
                onClick={fetchVocabulary}
                variant="light"
                radius="xl"
                className="h-12"
              >
                Search
              </Button>
            </div>

            <div className="w-full">
              <Button
                onClick={() => setKeyboardVisible(!keyboardVisible)}
                variant="light"
                radius="xl"
                className="mb-4"
              >
                {keyboardVisible ? "Hide Keyboard" : "Show Keyboard"}
              </Button>

              {keyboardVisible && (
                <div className="p-4 bg-white rounded-lg shadow-lg">
                  <Keyboard
                    keyboardRef={(r) => (keyboard.current = r)}
                    layout={JapaneseLayout}
                    layoutName={layoutName}
                    onChange={onChange}
                    onKeyPress={onKeyPress}
                    theme="hg-theme-default custom-theme"
                    value={inputText}
                    buttonTheme={[
                      {
                        class: "hg-red",
                        buttons: "{shift} {bksp} {kana}",
                      },
                    ]}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .custom-theme {
            background-color: #fff;
            border-radius: 0.5rem;
            padding: 0.5rem;
          }
          .hg-red {
            background: rgb(251 191 36) !important;
            color: white !important;
          }
          .hg-button {
            height: 40px !important;
            border-radius: 6px !important;
            border: 1px solid #ddd !important;
            background: white !important;
            color: black !important;
          }
          .hg-button:hover {
            background: #f3f4f6 !important;
          }
        `}
      </style>
      {vocabResult && <VocabCard vocabResult={vocabResult} />}
    </div>
  );
};

export default LandingPage;
