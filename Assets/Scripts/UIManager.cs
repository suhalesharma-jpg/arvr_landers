using UnityEngine;
using TMPro;

public class UIManager : MonoBehaviour
{
    public static UIManager Instance;

    public GameObject infoPanel;
    public TMP_Text monumentTitle;
    public TMP_Text whyBuiltText;
    public TMP_Text importanceText;
    public TMP_Text uniqueText;

    private void Awake()
    {
        Instance = this;
        infoPanel.SetActive(false);
    }

    public void ShowInfo(MonumentData data)
    {
        monumentTitle.text = data.monumentName;
        whyBuiltText.text = "Why Built: " + data.whyBuilt;
        importanceText.text = "Importance: " + data.importance;
        uniqueText.text = "Unique Feature: " + data.uniqueFeature;

        infoPanel.SetActive(true);

        AudioManager.Instance.PlayAudio(data.audioClipName);
    }

    public void ClosePanel()
    {
        infoPanel.SetActive(false);
    }
}

