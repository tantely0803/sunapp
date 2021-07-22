import React, { useState } from 'react';
import * as style from './style';
import { Keyboard, Image, View, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

const Dropdown = ({
    input,
    onChange,
    zIndex,
    category,
    defaultValues = [],
}) => {
    const [dropdownActive, setDropdownActive] = useState(false);
    const [value, setValue] = useState(input.value[0]);
    const [valueMulti, setValueMulti] = useState([...defaultValues]);
    const [dataSearch, setDataSearch] = useState(input.value);

    return (
        <>
            <style.groupInput style={{ zIndex }}>
                <style.label>{input.label}</style.label>
                <style.contentdropdown>
                    <style.picker
                        onPress={() => setDropdownActive(!dropdownActive)}
                    >
                        {input.multi ? (
                            <style.input
                                placeholder="Rechercher une maladie"
                                maxLength={1}
                                onChangeText={(text) => {
                                    if (text.length === 1) {
                                        setDataSearch(
                                            input.value.filter((value) => {
                                                return (
                                                    value.name[0].toLowerCase() ===
                                                    text.toLowerCase()
                                                );
                                            })
                                        );
                                        setDropdownActive(true);
                                        Keyboard.dismiss();
                                    }
                                }}
                            />
                        ) : (
                            <style.textpicker>{value}</style.textpicker>
                        )}
                        <style.arrowbottom
                            source={require('../../assets/images/arrow-bottom.png')}
                        />
                    </style.picker>
                    <View
                        style={{
                            display: dropdownActive ? 'flex' : 'none',
                            zIndex: 1031,
                        }}
                    >
                        <style.listItems>
                            {input.multi ? (
                                <ScrollView style={style.scroll}>
                                    {dataSearch
                                        ? dataSearch.map((content, i) => (
                                              <TouchableOpacity
                                                  onPress={() => {
                                                      if (
                                                          valueMulti.includes(
                                                              content.name
                                                          )
                                                      ) {
                                                          onChange(
                                                              valueMulti.filter(
                                                                  (itemText) =>
                                                                      itemText !==
                                                                      content.name
                                                              ),
                                                              input.name
                                                          );
                                                          setValueMulti(
                                                              valueMulti.filter(
                                                                  (itemText) =>
                                                                      itemText !==
                                                                      content.name
                                                              )
                                                          );
                                                      } else {
                                                          setDropdownActive(
                                                              !dropdownActive
                                                          );
                                                          category(
                                                              content.category,
                                                              'word_disease'
                                                          );
                                                          onChange(
                                                              [
                                                                  ...valueMulti,
                                                                  content.name,
                                                              ],
                                                              input.name
                                                          );
                                                          setValueMulti([
                                                              ...valueMulti,
                                                              content.name,
                                                          ]);
                                                      }
                                                  }}
                                                  key={i}
                                              >
                                                  <style.item
                                                      multi={valueMulti.includes(
                                                          content.name
                                                      )}
                                                  >
                                                      <style.text
                                                          multi={valueMulti.includes(
                                                              content.name
                                                          )}
                                                      >
                                                          {content.name}
                                                      </style.text>
                                                  </style.item>
                                              </TouchableOpacity>
                                          ))
                                        : null}
                                </ScrollView>
                            ) : (
                                <ScrollView style={style.scroll}>
                                    {dataSearch
                                        ? dataSearch.map((text, i) => (
                                              <TouchableOpacity
                                                  onPress={() => {
                                                      onChange(
                                                          text,
                                                          input.name
                                                      );
                                                      setValue(text);
                                                      setDropdownActive(false);
                                                  }}
                                                  key={i}
                                              >
                                                  <style.item
                                                      multi={valueMulti.includes(
                                                          text
                                                      )}
                                                  >
                                                      <style.text
                                                          multi={valueMulti.includes(
                                                              text
                                                          )}
                                                      >
                                                          {text}
                                                      </style.text>
                                                  </style.item>
                                              </TouchableOpacity>
                                          ))
                                        : null}
                                </ScrollView>
                            )}
                        </style.listItems>
                    </View>
                </style.contentdropdown>
            </style.groupInput>
            <style.flex>
                {input.multi
                    ? valueMulti.map((item, i) => (
                          <style.tag
                              onPress={() => {
                                  onChange(
                                      valueMulti.filter(
                                          (itemText) => itemText !== item
                                      ),
                                      input.name
                                  );
                                  setValueMulti(
                                      valueMulti.filter(
                                          (itemText) => itemText !== item
                                      )
                                  );
                              }}
                              key={i}
                          >
                              <style.colorWhite>{item}</style.colorWhite>
                              <Image
                                  source={require('../../assets/images/close-white.png')}
                                  style={{ width: 8, height: 8, marginLeft: 8 }}
                              />
                          </style.tag>
                      ))
                    : null}
            </style.flex>
            {dropdownActive ? (
                <style.overlay
                    onPress={() => setDropdownActive(!dropdownActive)}
                />
            ) : null}
        </>
    );
};

export default Dropdown;
