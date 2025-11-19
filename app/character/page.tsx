"use client";

import { useState, type FormEvent } from "react";
import { getJSON, postJSON } from "@/lib/clientApi";
import type { Character } from "@/lib/models";
import {
  spriteOptions,
  spriteColorOptions,
  defaultSprite,
  defaultSpriteColor,
  type SpriteOptionValue,
  type SpriteColorValue
} from "@/lib/characterSpriteOptions";
import {
  characterSpirits,
  defaultSpiritId,
  type CharacterSpiritId
} from "@/lib/characterSpirits";

type CharacterListResponse = {
  characters: Character[];
};

type CharacterFormState = {
  ownerId: string;
  name: string;
  sprite: SpriteOptionValue;
  spriteColor: SpriteColorValue;
  spiritId: CharacterSpiritId;
};

const defaultForm: CharacterFormState = {
  ownerId: "",
  name: "",
  sprite: defaultSprite,
  spriteColor: defaultSpriteColor,
  spiritId: defaultSpiritId
};

export default function CharacterPage() {
  const [form, setForm] = useState<CharacterFormState>(defaultForm);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingList, setLoadingList] = useState(false);

  const characterLimitReached = characters.length >= 4;

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form.ownerId) {
      setMessage("Informe o ownerId para criar personagens.");
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      await postJSON<Character>("/api/character/create", form);
      setMessage(`Personagem ${form.name} criado.`);
      setForm((prev) => ({ ...prev, name: "" }));
      await loadCharacters(form.ownerId);
    } catch (err) {
      setMessage(getMessage(err));
    } finally {
      setLoading(false);
    }
  }

  async function loadCharacters(ownerId: string) {
    setLoadingList(true);
    setMessage(null);
    try {
      const response = await getJSON<CharacterListResponse>(`/api/character/get?ownerId=${ownerId}`);
      setCharacters(response.characters);
    } catch (err) {
      setCharacters([]);
      setMessage(getMessage(err));
    } finally {
      setLoadingList(false);
    }
  }

  async function handleLoad() {
    if (!form.ownerId) {
      setMessage("Informe o ownerId");
      return;
    }
    await loadCharacters(form.ownerId);
  }

  return (
    <section>
      <div className="card">
        <h2>Etapa 1 — Criação de Personagem (até 4 por usuário)</h2>
        <p>Preencha o ownerId (ID do usuário) e gerencie até 4 personagens, cada um com sprite.</p>
        {message && <p>{message}</p>}
      </div>
      <div className="grid">
        <div className="card">
          <form
            onSubmit={(event) => {
              void handleCreate(event);
            }}
          >
            <label htmlFor="ownerId">Owner ID</label>
            <input
              id="ownerId"
              required
              value={form.ownerId}
              onChange={(event) => setForm((prev) => ({ ...prev, ownerId: event.target.value }))}
            />
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              required
              minLength={3}
              value={form.name}
              onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
              disabled={characterLimitReached}
            />
            <label htmlFor="sprite">Sprite</label>
            <select
              id="sprite"
              value={form.sprite}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  sprite: event.target.value as SpriteOptionValue
                }))
              }
              disabled={characterLimitReached}
            >
              {spriteOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <label htmlFor="spriteColor">Cor</label>
            <select
              id="spriteColor"
              value={form.spriteColor}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  spriteColor: Number(event.target.value) as SpriteColorValue
                }))
              }
              disabled={characterLimitReached}
            >
              {spriteColorOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <label htmlFor="spirit">Espírito</label>
            <select
              id="spirit"
              value={form.spiritId}
              onChange={(event) =>
                setForm((prev) => ({
                  ...prev,
                  spiritId: event.target.value
                }))
              }
              disabled={characterLimitReached}
            >
              {characterSpirits.map((spirit) => (
                <option key={spirit.id} value={spirit.id}>
                  {spirit.nome}
                </option>
              ))}
            </select>
            <button className="button" disabled={loading || characterLimitReached}>
              {characterLimitReached ? "Limite de 4 alcançado" : "Salvar Personagem"}
            </button>
          </form>
        </div>
        <div className="card">
          <h3>Personagens do usuário</h3>
          <button
            className="button"
            type="button"
            onClick={() => {
              void handleLoad();
            }}
          >
            Carregar personagens
          </button>
          {loadingList && <p>Carregando…</p>}
          <ul className="list" style={{ marginTop: 12 }}>
            {characters.map((character) => (
              <li key={character._id ?? character.name}>
                {character.name} — sprite {character.sprite} — nível {character.stats.level} — ID:
                <code>{character._id}</code>
              </li>
            ))}
            {characters.length === 0 && !loadingList && <li>Nenhum personagem carregado.</li>}
          </ul>
        </div>
      </div>
    </section>
  );
}

function getMessage(err: unknown) {
  return err instanceof Error ? err.message : "Erro desconhecido";
}
