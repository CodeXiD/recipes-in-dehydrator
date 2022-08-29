import { useMemo, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
  },
  tagItemText: {
    fontSize: 12,
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
        {tags.map(tag => (
          <View key={tag} style={styles.tagItem}>
            <Text style={styles.tagItemText}>#{tag}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
