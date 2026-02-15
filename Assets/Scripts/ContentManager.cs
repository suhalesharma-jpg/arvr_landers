using UnityEngine;
using System.Collections.Generic;

[System.Serializable]
public class MonumentData
{
    public string monumentName;
    public string whyBuilt;
    public string importance;
    public string uniqueFeature;
    public string audioClipName;
}

[System.Serializable]
public class MonumentList
{
    public List<MonumentData> monuments;
}

public class ContentManager : MonoBehaviour
{
    public static ContentManager Instance;

    private Dictionary<string, MonumentData> monumentDictionary;

    private void Awake()
    {
        Instance = this;
        LoadData();
    }

    private void LoadData()
    {
        TextAsset jsonFile = Resources.Load<TextAsset>("monuments");
        MonumentList monumentList = JsonUtility.FromJson<MonumentList>(jsonFile.text);

        monumentDictionary = new Dictionary<string, MonumentData>();

        foreach (MonumentData data in monumentList.monuments)
        {
            monumentDictionary[data.monumentName] = data;
        }
    }

    public MonumentData GetMonumentData(string monumentName)
    {
        if (monumentDictionary.ContainsKey(monumentName))
        {
            return monumentDictionary[monumentName];
        }

        return null;
    }
}

