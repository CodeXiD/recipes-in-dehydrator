import { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import BaseInput from './BaseInput';
import BaseButton from '../buttons/BaseButton';

const styles = StyleSheet.create({
  newTagContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  newTagInput: {
    flex: 1,
  },
  newTagAddButton: {
    marginLeft: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tagItem: {
    backgroundColor: '#e5e5e5',
    padding: 3,
    borderRadius: 4,
    marginRight: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagItemText: {
    fontSize: 12,
    marginRight: 4,
  },
  tagsEmptyContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tagsEmptyText: {
    color: '#939393',
    textAlign: 'center',
  },
});

export default function TagsInput({
  tags = [],
  label = undefined,
  placeholder = undefined,
  onChangeTags = () => undefined,
}: {
  tags: string[];
  label: string | undefined;
  placeholder: string | undefined;
  onChangeTags: any;
}) {
  const [newTag, setNewTag] = useState('');

  const canAddTag = useMemo(() => {
    return newTag.length >= 2;
  }, [newTag]);

  const addTag = (): any => {
    if (canAddTag) {
      if (tags.indexOf(newTag.toLowerCase()) === -1) {
        onChangeTags([...tags, newTag.toLowerCase()]);
      }

      setNewTag('');
    }
  };

  const removeTag = (idx: number) => {
    const tagsWithoutRemovedTag = tags.filter((tag, _idx) => {
      return _idx !== idx;
    });

    onChangeTags(tagsWithoutRemovedTag);
  };

  const tagsContent = tags.map((tag, idx) => (
    <View key={tag} style={styles.tagItem}>
      <Text style={styles.tagItemText}>#{tag}</Text>

      <Pressable onPress={() => removeTag(idx)}>
        <AntDesign name="closecircle" size={18} color="#848484" />
      </Pressable>
    </View>
  ));

  const tagsEmpty = (
    <View style={styles.tagsEmptyContainer}>
      <Text style={styles.tagsEmptyText}>Щє не додано жодного тега</Text>
    </View>
  );

  return (
    <View>
      <View style={styles.newTagContainer}>
        <View style={styles.newTagInput}>
          <BaseInput
            label={label}
            placeholder={placeholder}
            value={newTag}
            onChangeValue={setNewTag}
            onSubmitEditing={addTag}
          />
        </View>

        <View style={styles.newTagAddButton}>
          <BaseButton disabled={!canAddTag} onPress={addTag}>
            Додати
          </BaseButton>
        </View>
      </View>

      <View style={styles.tagsContainer}>
        {tags.length ? tagsContent : tagsEmpty}
      </View>
    </View>
  );
}
